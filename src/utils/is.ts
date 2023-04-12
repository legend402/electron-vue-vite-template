const getVarType = (val: any) => {
  return Object.prototype.toString.call(val).replace(/\[object\s|\]/g, "");
}

export const isString = (val: any): val is string => getVarType(val) === 'String'

export const isNumber = (val: any): val is number => getVarType(val) === 'Number'

export const isBoolean = (val: any): val is boolean => getVarType(val) === 'Boolean'

export const isArray = (val: any): val is Array<unknown> => getVarType(val) === 'Array'

export const isObject = (val: any): val is Object => getVarType(val) === 'Object'

export const isMap= (val: any): val is Map<unknown, unknown> => getVarType(val) === 'Map'

export const isSet = (val: any): val is Set<unknown> => getVarType(val) === 'Set'

export const isEmpty = (val: any): boolean => {
  if ((Array.isArray(val) || typeof val === 'string') && val.length === 0) {
    return true
  }
  
  if (isObject(val) && Object.keys(val).length === 0) {
    return true
  }

  if ((isMap(val) || isSet(val)) && val.size === 0) {
    return true
  }

  return false
}