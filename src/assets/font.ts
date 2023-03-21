export const registerFonts = () => {
  const fontMap = import.meta.glob('./fonts/*.ttf', { eager: true })
  const fonts = Object.values(fontMap).map((item: any) => item.default)
  
  const fontInstance = fonts.map(item => new FontFace(getFileName(item), `url(${item})`, {}))

  Promise.all(fontInstance.map(item => item.load()))
    .then(fonts => {
      fonts.forEach((item) => {
        (document.fonts as any).add(item)
      })
    })
}

registerFonts()


function getFileName(filePath: string): string {
  const fileFullName = filePath.split('/').at(-1)!

  let [fileName] = fileFullName.split('.')
  fileName = fileName.split('-')[0]

  return fileName
}