export const resetObject = <T extends Record<string, any>>(obj: T) => {
  const keys = Object.keys(obj) as Array<keyof T>
  keys.forEach(key => {
    obj[key] = '' as any
  })
}
