import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'

const createWindow = () => {
  const win = new BrowserWindow({
    minHeight: 600,
    minWidth: 800,
    resizable: true,
    titleBarStyle: 'hidden',
    transparent: true,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
    },
  })

  initEvent(win)

  win.openDevTools()

  if (app.isPackaged) {
    win.loadFile(join(__dirname, '../preload/index.js'))
  } else {
    const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`
    win.loadURL(url)
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


function initEvent(app: BrowserWindow) {
  ipcMain.on('window-max', () => {
    if(app.isMaximized()) {
      app.unmaximize()
    }else{
      app.maximize()
    }
  })
  ipcMain.on('window-min', function () {
    app.minimize();
  })
  ipcMain.on('window-close', function () {
    app.close();
  })
}