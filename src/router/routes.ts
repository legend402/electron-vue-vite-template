import { type RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/home/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/pages/list/index.vue'),
    meta: {
      title: '列表'
    }
  },
];
