const getVarType = (val: any) => {
  return Object.prototype.toString.call(val).replace(/\[object\s|\]/g, "");
}

export const isString = (val: any): val is string => getVarType(val) === 'String'

export const isNumber = (val: any): val is number => getVarType(val) === 'Number'

export const isBoolean = (val: any): val is boolean => getVarType(val) === 'Boolean'

export const isArray = (val: any): val is Array<unknown> => getVarType(val) === 'Array'

export const isObject = (val: any): val is Object => getVarType(val) === 'Object'
