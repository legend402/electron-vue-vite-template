import { showDeviceVersion, showMediaVersion } from "@/pages/VideoCall/call/video"

interface CallStoreProps {
  isCalling: boolean
  isLogin: boolean
  isBack: boolean
  cameraStatus: 'user' | 'device'
  currentUserName: string
  userList: string[]
}

export const useCallingStore = defineStore('call', {
  state(): CallStoreProps {
    return {
      currentUserName: '',
      isCalling: false,
      isLogin: false,
      isBack: false,
      cameraStatus: 'user',
      userList: [],
    }
  },
  actions: {
    setIsCalling(bol: boolean) {
      this.isCalling = bol
    },
    setIsLogin(bol: boolean) {
      this.isLogin = bol
    },
    setIsBack(bol: boolean) {
      this.isBack = bol
    },
    setCurrentUsername(name: string) {
      this.currentUserName = name
    },
    setUserList(data: CallStoreProps['userList']) {
      this.userList = data
    },
    setCameraStatus(state: CallStoreProps['cameraStatus']) {
      this.cameraStatus = state;
      (state === 'device' ? showDeviceVersion : showMediaVersion)()
    }
  },
  persist: {
    paths: ['currentUserName']
  }
})

const callingInstance = () => {
  return useCallingStore()
}
export {
  callingInstance
}
