export const resetObject = <T extends Record<string, any>>(obj: T) => {
  const keys = Object.keys(obj) as Array<keyof T>
  keys.forEach(key => {
    obj[key] = '' as any
  })
}


export function to<T, U = Error> (
  promise: Promise<T>,
  errorExt?: object
): Promise<[undefined, U] | [T, null]> {
  return promise
    .then<[T, null]>((data: T) => [data, null]) // 执行成功，返回数组第一项为 null。第二个是结果。
    .catch<[undefined, U]>((err: U) => {
      if (errorExt) {
        Object.assign(err as any, errorExt);
      }

      return [undefined, err]; // 执行失败，返回数组第一项为错误信息，第二项为 undefined
    });
}

export const getVueInstance = () => {
  return getCurrentInstance()!.appContext.app.config.globalProperties
}
