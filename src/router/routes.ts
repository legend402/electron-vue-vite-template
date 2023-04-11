import { DEVElOP_STATUS } from '@/utils/enums';
import { type RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/index.vue'),
    meta: {
      title: '首页',
      icon: 'home',
      status: DEVElOP_STATUS.DONE,
    }
  },
  {
    path: '/morse',
    name: 'morse',
    component: () => import('@/pages/Morse/index.vue'),
    meta: {
      title: '摩斯密码',
      icon: 'password',
      status: DEVElOP_STATUS.DONE,
    }
  },
  {
    path: '/image',
    name: 'image',
    component: () => import('@/pages/Image/index.vue'),
    meta: {
      title: '图片操作',
      icon: 'aperture',
      status: DEVElOP_STATUS.BUG,
    }
  },
  {
    path: '/draw',
    name: 'draw',
    component: () => import('@/pages/draw/index.vue'),
    meta: {
      title: '画板',
      icon: 'draw',
      status: DEVElOP_STATUS.DEVELOP,
    }
  },
  {
    path: '/call',
    name: 'call',
    component: () => import('@/pages/VideoCall/index.vue'),
    meta: {
      title: '视频通话',
      icon: 'phone',
      status: DEVElOP_STATUS.DONE,
    }
  },
  {
    path: '/fileSys',
    name: 'fileSys',
    component: () => import('@/pages/fileSys/index.vue'),
    meta: {
      title: '文件操作',
      icon: 'file',
      status: DEVElOP_STATUS.DEVELOP,
    }
  },
  {
    path: '/recrod',
    name: 'recrod',
    component: () => import('@/pages/Record/index.vue'),
    meta: {
      title: '录屏',
      icon: 'recording',
      status: DEVElOP_STATUS.DONE,
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    meta: {
      title: 'Page not found',
      notInMenu: true,
    },
    component: () => import('@/components/NotFound.vue')
  },
  // 所有未定义路由，全部重定向到404页
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    meta: {
      notInMenu: true,
    },
  },
]

function handleRoute(): RouteRecordRaw[] {
  const result = import.meta.glob('../pages/**/*{.vue,.tsx}', { eager: true })
  return Object.keys(result).map(item => {
    const component = (result[item] as any).default
    const [name, title] = component.name?.split('-') || []
    return {
      path: name === 'home' ? '/' : `/${name}`,
      name: name,
      component,
      meta: {
        title,
      },
    }
  })
}
