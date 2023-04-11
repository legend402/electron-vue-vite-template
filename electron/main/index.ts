import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { initEvent } from './event'

let win: BrowserWindow

const createWindow = () => {
  win = new BrowserWindow({
    minHeight: 600,
    minWidth: 800,
    resizable: true,
    titleBarStyle: 'hidden',
    transparent: true,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: join(__dirname, '../preload/index.js'),
    },
  })

  initEvent(win)

  if (app.isPackaged) {
    win.loadFile(join(__dirname, '../../index.html'))
  } else {
    const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`
    win.loadURL(url)

    win.openDevTools()
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
      allWindows[0].focus()
    } else {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

