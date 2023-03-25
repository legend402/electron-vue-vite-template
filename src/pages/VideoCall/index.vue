<template>
  <div content-height flex="~ col">
    <div class="first-action" flex items-center gap-5 w-70>
      <VaInput label="用户名" v-model="username"></VaInput>
      <Button theme>登陆</Button>
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
                {{ contact.name }}
              </va-list-item-label>
            </va-list-item-section>

            <va-list-item-section icon>
              <div i-carbon-phone-filled bg-main cursor-pointer></div>
            </va-list-item-section>
          </va-list-item>
        </va-list>
      </div>
      <div class="video-list" flex="~ col" gap-5 flex-1>
        <div>
          <Button theme>结束通话</Button>
        </div>
        <video ref="localVideoRef" h-70  border="1 dashed" rounded-10></video>
        <video ref="remoteVideo" h-70  border="1 dashed" rounded-10></video>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const username = ref('')
const localVideoRef = ref<HTMLVideoElement>()

const contacts = reactive([
  {
    name: "Audrey Clay",
  },
  {
    name: "Aguirre Klein",
  },
  {
    name: "Tucker Kaufman",
  },
  {
    name: "Herbert Keller",
  },
])



onMounted(async () => {
  const localStream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  })
  const localVideo = localVideoRef.value!
  localVideo.srcObject = localStream
  localVideo.onloadedmetadata = () => {
    localVideo.play()
  }
})
</script>

<style scoped>
.list__item+.list__item {
  margin-top: 20px;
}
</style>
