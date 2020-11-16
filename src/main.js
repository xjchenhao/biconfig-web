import 'ant-design-vue/dist/antd.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

let instance = null;

function render() {
  instance = createApp(App)
    .use(router).
    mount('#biApp');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
export async function bootstrap() {
  // eslint-disable-next-line no-console
  console.log('vue app bootstraped');
}

export async function mount(props) {
  // eslint-disable-next-line no-console
  console.log('props from main framework', props);

  if (!props.data.fns) {
    render({
      data: () => {
        return {
          ...props.data,
        };
      },
    });

    return;
  }

  const methods = {};
  props.data.fns.forEach(item => {
    methods[item.name] = item;
  });

  delete props.data.fns;

  render({
    data: () => {
      return {
        ...props.data,
      };
    },
    methods,
  });
}

export async function unmount() {
  console.log('微服务卸载中：', instance);
  instance && instance.$destroy();
  instance = null;
}

