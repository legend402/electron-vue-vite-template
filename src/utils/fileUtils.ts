import { Rect } from "./types"

interface SelectFileProps {
  fileType?: string[]
}

export const selectFile = async (options: SelectFileProps = {}) => {
  const {
    fileType = []
  } = options

  // 因为现在window上还没有这个api
  let fileHandler = null
  try {
    const [handler] = await (window as any).showOpenFilePicker()
    fileHandler = handler
  } catch (error) {
    return Promise.reject(new Error('取消选择'))
  }
  const file: File = await fileHandler.getFile()

  const currentType = file.name.split('.').at(-1)?.toLocaleLowerCase()
  
  if (fileType.length && !fileType.includes(currentType!))
    return Promise.reject(new Error('上传文件类型有误'))
  
  return file
}

export const fileToUrl = (file: File): Promise<string> => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.readAsDataURL(file)
  })
}

export const getImageRect = (url: string): Promise<Rect & { img: HTMLImageElement }> => {
  return new Promise(resolve => {
    const image = new Image()
    image.src = url
    image.onload = () => {
      resolve({
        width: image.width,
        height: image.height,
        img: image
      })
    }
  })
}
