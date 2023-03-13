import { resetObject } from "@/utils"
import { explainToSecretMap, secretToExplainMap } from "../static"

const config = reactive({
  dot: '',
  line: '',
  split: '',
  space: '',
})

const defaultConfig = {
  dot: '.',
  line: '-',
  split: ' ',
  space: '  ',
}

function getConfig() {
  const { dot, line, space, split } = config
  return {
    dot: dot || defaultConfig.dot,
    line: line || defaultConfig.line,
    space: space || defaultConfig.space,
    split: split || defaultConfig.split,
  }
}

function useMorseCompiler() {
  const model = reactive({
    secret: '',
    explain: '',
  })
  // 摩斯密码 => 明文
  const morseToExplain = () => {
    const arr = handleSecret(model.secret)
    model.explain = handleSecretToExplain(arr)
  }

  // 将摩斯密码换成数组格式
  const handleSecret = (secretText: string) => {
    const { space, split, dot, line } = getConfig()

    if (dot !== defaultConfig.dot)
      secretText = secretText.replaceAll(dot, defaultConfig.dot)
    

    if (line !== defaultConfig.line)
    secretText = secretText.replaceAll(line, defaultConfig.line)

    const arr = secretText.replaceAll(space, `${split}~${split}`).split(split)
    if (arr.at(-1) === split)
      arr.splice(arr.length - 1, 1)
    return arr
  }
  // 将数组格式的密码换成明文
  const handleSecretToExplain = (arr: string[]) => {
    return arr.map(item => {
      const findRes = secretToExplainMap[item]
      return findRes || (item === '~' ? ' ' : item)
    }).join('')
  }

  const explainToSecret = () => {
    model.explain = model.explain.toLocaleUpperCase()
    const arr = handleExplain(model.explain)
    model.secret = handleExplainToSecret(arr)
  }

  const handleExplain = (explainText: string) => {
    return explainText.split('').map(item => item === ' ' ? '~' : item)
  }

  const handleExplainToSecret = (arr: string[]) => {
    const { split, dot, line } = getConfig()
    let result = arr.map(item => {
      const findRes = explainToSecretMap[item]
      return findRes || (item === '~' ? '' : item)
    }).join(split)

    if (dot !== defaultConfig.dot)
      result = result.replaceAll(defaultConfig.dot, dot)

    if (line !== defaultConfig.line)
      result = result.replaceAll(defaultConfig.line, line)

    return result
  }

  const reset = () => {
    resetObject(config)
    resetObject(model)
  }

  return {
    explainToSecret,
    morseToExplain,
    model,
    reset,
  }
}

function useMorseInit() {
  return {
    config
  };
}

export {
  useMorseCompiler,
  useMorseInit
}
