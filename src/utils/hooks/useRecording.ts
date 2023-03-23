import { to } from '@/utils';
import type { Ref } from 'vue';
import { useToast } from 'vuestic-ui/web-components';
import { createNewFile, saveFile } from '../fileUtils';

export const useRecording = (videoRef: Ref<HTMLVideoElement | undefined>) => {
  let recorder: null | MediaRecorder
  const chunks: Blob[] = []
  let media: MediaStream | undefined
  
  const { init } = useToast()

  const startRecord = async () => {
    if (media) {
      init('录像已经开始，请勿重复点击！')
      return
    }
    [media] = await to(navigator.mediaDevices.getDisplayMedia({
      video: {
        width: 1920,
        height: 1080,
      },
      audio: true,
    }))
    if (!media) {
      init('请同意相对应的权限！或以https环境访问该网站！')
      return
    }
    chunks.length = 0
    const video = videoRef.value!
    video.src = ''
    video.srcObject = media
    video.controls = false
    video.onloadedmetadata = () => {
      video.play()
    }

    // 记录录屏
    recorder = new MediaRecorder(media)

    recorder.ondataavailable = event => {
      chunks.push(event.data)
    }

    recorder.onstop = playRecording
    recorder.start()
  }

  const downloadRecord = async () => {
    console.log(chunks.length);
    
    if (chunks.length === 0) {
      init('当前暂无录屏可下载！')
      return
    }

    const blob = new Blob(chunks, {
      type: 'video/mp4',
    })

    const fileHandle = await createNewFile({ fileName: '录屏', fileType: 'mp4', accept: 'video/mp4' })
    await saveFile(fileHandle, blob)

    chunks.length = 0
  }

  const playRecording = () => {
    const blob = new Blob(chunks, {
      type: 'video/mp4',
    })
    const url = URL.createObjectURL(blob)
    const video = videoRef.value!
    
    video.srcObject = null
    video.src = url
    video.controls = true
    video.play()
  }

  return {
    startRecord,
    stopRecord() {
      if (!recorder) {
        init('请先开启录屏！')
        return
      }
      recorder.stop()
      media = undefined
    },
    downloadRecord,
  }
}
