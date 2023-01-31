import { type RouteRecordRaw } from 'vue-router';

export const routes = handleRoute();

function handleRoute(): RouteRecordRaw[] {
  const result = import.meta.glob('../pages/**/*{.vue,.tsx}', { eager: true })
  return Object.keys(result).map(item => {
    const component = (result[item] as any).default
    const [name, title] = component.name.split('-')
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
