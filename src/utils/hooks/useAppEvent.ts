export const useAppEvent = () => {
  const ctx = getCurrentInstance()
  const ipcRenderer = ctx?.appContext.config.globalProperties.$ipcRenderer
  
  const windowMax = () => {
    ipcRenderer?.send('window-max');
  }
  const windowMin = () => {
    ipcRenderer?.send('window-min');
  }
  const windowClose = () => {
    ipcRenderer?.send('window-close');
  }

  return {
    windowMax,
    windowClose,
    windowMin,
  }
}
