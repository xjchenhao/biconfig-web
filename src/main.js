import 'ant-design-vue/dist/antd.css';
import './mock';

console.log('NODE_ENV：', process.env.NODE_ENV);
console.log('VUE_APP_isMock：', process.env.VUE_APP_isMock);
console.log('VUE_APP_apiPrefix：', process.env.VUE_APP_apiPrefix);

import './public-path';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import routes from './router';
import store from './store';

if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

let router = null;
let instance = null;

function render(props = {}) {
  const { data, methods } = props;
  router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  instance = createApp(App);
  instance.use(router);
  instance.use(store);

  instance.mixin({
    data() {
      return {
        ...data,
      };
    },
    methods,
  });
  instance.mount('#biApp');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('%c ', 'color: green;', 'vue3.0 app bootstraped');
}

function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    });
}

export async function mount(props) {
  console.log('mount props：', props);
  const { data, methods } = props;

  // 兼容老代码，后续删除之
  if (data.fns) {
    data.fns.forEach(item => {
      methods[item.name] = item;
    });

    delete data.fns;
  }


  storeTest(props);
  render({
    ...props,
    methods,
  });
  instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange;
  instance.config.globalProperties.$setGlobalState = props.setGlobalState;
}

export async function unmount() {
  instance.unmount();
  instance._container.innerHTML = '';
  instance = null;
  router = null;
}
