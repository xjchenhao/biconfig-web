// import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/graph',
  },
  {
    path: '/graph',
    name: 'Graph',
    component: () => import('../views/GraphList'),
  },
  {
    path: '/graph/selectType',
    name: 'GraphSelectType',
    component: () => import('../views/GraphSelectType'),
  },
  {
    path: '/graph/config',
    name: 'GraphConfig',
    component: () => import('../views/GraphConfig'),
  },
  {
    path: '/graph/view',
    name: 'GraphView',
    component: () => import('../views/GraphView'),
  },
  {
    path: '/demo',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes,
// });

export default routes;
