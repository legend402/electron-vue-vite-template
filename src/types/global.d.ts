import type Electron from 'electron'
import { ModalOptions, ToastOptions } from 'vuestic-ui/web-components';

declare global {
  var ipcRenderer: Electron.IpcRenderer;
  const io: any
  
  const confirmFn: (options: string | ModalOptions) => Promise<boolean>
  const toastFn: (options: string | ToastOptions) => string | null

  interface Window {
    confirmFn: (options: string | ModalOptions) => Promise<boolean>
    toastFn: (options: string | ToastOptions) => string | null
    ipcRenderer: Electron.IpcRenderer
  }
}

export {}
