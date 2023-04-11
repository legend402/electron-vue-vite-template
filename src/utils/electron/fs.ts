interface ReaddirItem { 
  name: string, 
  isDir: boolean 
}
type Readdir = ReaddirItem[]

function readdir(text: string): Promise<Readdir> {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('readdir', text)
    ipcRenderer.on('readdir-relpay', (_e, fileList) => {
      resolve(fileList)
    })
  })
}

function readFile(text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('readFile', text)
    ipcRenderer.on('readFile-relpay', (_e, file) => {
      resolve(file)
    })
  })
}

export type {
  ReaddirItem,
  Readdir,
}

export {
  readdir,
  readFile,
}
