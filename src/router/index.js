import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Graph from '../views/Graph.vue';

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/graph',
    component: () => import('../layout/TableLayout.vue'),
    children: [{
      path: '/graph',
      name: 'Graph',
      component: Graph,
    }],
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

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
