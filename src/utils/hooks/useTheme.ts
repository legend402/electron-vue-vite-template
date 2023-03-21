import { useCssVar, useStorage } from "@vueuse/core"


export const useTheme = () => {
  
  const colors = reactive([
    'rgb(112,56,240)',
    'rgb(49,181,247)',
    'rgb(250,135,53)',
    'rgb(249,197,21)',
  ])
  const storageColor = useStorage('main-theme', '')
  
  const color = useCssVar('--theme-color', document.body)
  color.value = storageColor.value || colors[0]
  
  const changeStyle = (item: string) => {
    color.value = item
    storageColor.value = item
  }

  return {
    changeStyle,
    color,
    colors
  }
}
