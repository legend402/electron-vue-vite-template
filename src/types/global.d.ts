import type Electron from 'electron'

declare global {
  var ipcRenderer: Electron.IpcRenderer;
  const io: any
}

export {}
