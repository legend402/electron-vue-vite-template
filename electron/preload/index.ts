const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('AppTool', {
  ipcRenderer,
})