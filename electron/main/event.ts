import { type BrowserWindow, ipcMain } from "electron";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

export function initEvent(app: BrowserWindow) {
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

  ipcMain.on('readdir', (event, text) => {
    event.reply('readdir-relpay', readdirSync(text).filter(fileName => isFile(join(text, fileName)) !== -1).map(fileName => {
      return {
        name: fileName,
        isDir: !isFile(join(text, fileName))
      }
    }))
  })

  ipcMain.on('readFile', (event, text) => {
    event.reply('readFile-relpay', readFileSync(text).toString())
  })
}

const isFile = (filePath: string) => {
  try {
    return statSync(filePath).isFile();
  } catch (error) {
    return -1
  }
}
