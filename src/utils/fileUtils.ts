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

export async function createNewFile({ fileName, fileType, accept }: { fileName: string, fileType: string, accept: string}) {
  const opts = {
    types: [{
      description: fileName,
      accept: { [accept]: [`.${fileType}`] },
    }],
  };
  return await (window as any).showSaveFilePicker(opts);
}

export async function saveFile(fileHandle: any, text: string | Blob | ArrayBuffer | DataView) {
  try {
    const fileWriter = await fileHandle.createWritable()
    // 写入数据
    await fileWriter.write(text)
    // 关闭可写流
    await fileWriter.close()

    return 1
  } catch (error) {
    return error
  }

}

export function dataURLtoBlob(dataUrl: string) {
  let arr = dataUrl.split(','),
    bstr = window.atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr]);
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
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      resolve({
        width: image.width,
        height: image.height,
        img: image
      })
    }
  })
}
