<template>
  <div content-height flex="~ col">
    <div class="first-action" flex items-center gap-5 w-70>
      <VaInput label="用户名" v-model="username"></VaInput>
      <Button theme @click="login">登陆</Button>
    </div>
    <div class="content" mt-4 flex gap-5 flex-1>
      <div class="user-list" w-80>
        <va-list>
          <va-list-label> 联系人 </va-list-label>

          <va-list-item v-for="(contact, index) in contacts" :key="index" class="list__item">
            <va-list-item-section avatar>
              <va-avatar >
                <div i-carbon-user-filled></div>
              </va-avatar>
            </va-list-item-section>

            <va-list-item-section>
              <va-list-item-label>
                {{ contact }}
              </va-list-item-label>
            </va-list-item-section>

            <va-list-item-section icon>
              <div i-carbon-phone-filled bg-main cursor-pointer @click="videoStart(contact)"></div>
            </va-list-item-section>
          </va-list-item>
        </va-list>
      </div>
      <div class="video-list" flex="~ col" gap-5 flex-1>
        <div>
          <Button theme @click="breakVideoConnect">结束通话</Button>
        </div>
        <video ref="localVideoRef" h-70  border="1 dashed" rounded-10></video>
        <video ref="remoteVideo" h-70  border="1 dashed" rounded-10></video>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCallingStore } from '@/store/call/useCallingStore';
import { initSocket, breakVideoConnect } from './call-upgrade/socket';
import { videoStart } from './call/userLits'
import { setVideoContainer } from './call/video';

const username = ref('')
const localVideoRef = ref<HTMLVideoElement>()
const remoteVideo = ref<HTMLVideoElement>()

const callingStore = useCallingStore()
const contacts = computed(() => callingStore.userList)
 
function checkToken() { //判断用户是否已有用户名
  if (!!callingStore.currentUserName) {
    callingStore.setIsLogin(true)
    username.value = callingStore.currentUserName
    initSocket(callingStore.currentUserName) //初始化socket连接
  }
}

const login = () => {
  callingStore.setIsLogin(true)
  callingStore.setCurrentUsername(username.value)
  initSocket(username.value) //初始化socket连接
}

onMounted(() => {
  checkToken()
  setVideoContainer(localVideoRef.value!, remoteVideo.value!)
})
</script>

<style scoped>
.list__item+.list__item {
  margin-top: 20px;
}
</style>
