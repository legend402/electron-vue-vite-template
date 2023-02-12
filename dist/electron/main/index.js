"use strict";const e=require("electron"),o=require("path");let n;const t=()=>{if(n=new e.BrowserWindow({minHeight:600,minWidth:800,resizable:!0,titleBarStyle:"hidden",transparent:!0,backgroundColor:"rgba(0, 0, 0, 0)",webPreferences:{nodeIntegration:!0,contextIsolation:!1,preload:o.join(__dirname,"../preload/index.js")}}),s(n),e.app.isPackaged)n.loadFile(o.join(__dirname,"../../index.html"));else{const i=`http://${process.env.VITE_DEV_SERVER_HOST}:${process.env.VITE_DEV_SERVER_PORT}`;n.loadURL(i),n.openDevTools()}};e.app.whenReady().then(()=>{t(),e.app.on("activate",()=>{const i=e.BrowserWindow.getAllWindows();i.length?i[0].focus():t()})});e.app.on("window-all-closed",()=>{process.platform!=="darwin"&&e.app.quit()});e.app.on("second-instance",()=>{n&&(n.isMinimized()&&n.restore(),n.focus())});function s(i){e.ipcMain.on("window-max",()=>{i.isMaximized()?i.unmaximize():i.maximize()}),e.ipcMain.on("window-min",function(){i.minimize()}),e.ipcMain.on("window-close",function(){i.close()})}
