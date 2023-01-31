import type Electron from 'electron'

declare global {
  var ipcRenderer: Electron.IpcRenderer;
}

export {}