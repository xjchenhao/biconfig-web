import 'ant-design-vue/dist/antd.css';
import './mock';

import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

console.log('NODE_ENV：', process.env.NODE_ENV);
console.log('VUE_APP_isMock：', process.env.VUE_APP_isMock);
console.log('VUE_APP_apiPrefix：', process.env.VUE_APP_apiPrefix);

let instance = null;

function render({ data = () => { return {}; }, methods = {} } = {}) {
  console.log('rootVue:', App);

  instance = createApp(App)
    .use(router)
    .use(store)
    .mixin({
      data,
      methods,
    })
    .mount('#biApp');

  console.log('rootVue instance:', instance);
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
export async function bootstrap() {
  // eslint-disable-next-line no-console
  console.log('vue app bootstraped');
}

// // 增加 update 钩子以便主应用手动更新微应用
// export function update(props) {

//   if (!props.data.fns) {
//     render({
//       data: () => {
//         return {
//           ...props.data,
//         };
//       },
//     });

//     return;
//   }

//   const methods = {};
//   props.data.fns.forEach(item => {
//     methods[item.name] = item;
//   });

//   delete props.data.fns;

//   render({
//     data: () => {
//       return {
//         ...props.data,
//       };
//     },
//     methods,
//   });
// }

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
  // instance && instance.$destroy(); // vue3移除了$destroy函数
  instance = null;
}

