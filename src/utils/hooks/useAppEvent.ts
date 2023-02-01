import { ipcRenderer } from "electron";

export const useAppEvent = () => {
  // const ipcRenderer = AppTool.ipcRenderer
  const windowMax = () => {
    ipcRenderer.send('window-max');
  }
  const windowMin = () => {
    ipcRenderer.send('window-min');
  }
  const windowClose = () => {
    ipcRenderer.send('window-close');
  }

  return {
    windowMax,
    windowClose,
    windowMin,
  }
}