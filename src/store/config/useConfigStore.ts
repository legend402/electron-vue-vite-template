export const useConfigStore = defineStore('configStore', {
  state() {
    return {
      isExpand: true,
    }
  },
  actions: {
    toggleExpand() {
      this.isExpand = !this.isExpand
    },
  },
  persist: true,
})
