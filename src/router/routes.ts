import { type RouteRecordRaw } from 'vue-router';


export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/index.vue'),
    meta: {
      title: '首页',
      icon: 'home'
    }
  },
  {
    path: '/morse',
    name: 'morse',
    component: () => import('@/pages/Morse/index.vue'),
    meta: {
      title: '摩斯密码',
      icon: 'password'
    }
  },
  {
    path: '/image',
    name: 'image',
    component: () => import('@/pages/Image/index.vue'),
    meta: {
      title: '图片操作',
      icon: 'aperture'
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
