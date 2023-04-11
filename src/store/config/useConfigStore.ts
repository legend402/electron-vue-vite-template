export const useConfigStore = defineStore('configStore', {
  state() {
    return {
      isExpand: false,
    }
  },
  actions: {
    toggleExpand() {
      this.isExpand = !this.isExpand
    },
  },
  persist: true,
})
