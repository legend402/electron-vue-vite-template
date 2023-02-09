/// <reference types="vite/client" />
/// <reference types="vue/ref-macros" />
import Electron from "electron"

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $ipcRenderer: Electron.IpcRenderer
  }
}


// declare const AppTool: {
//   ipcRenderer: Electron.IpcRenderer
// }
