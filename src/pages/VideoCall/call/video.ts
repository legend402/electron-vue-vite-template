import { useCallingStore } from "@/store/call/useCallingStore";
import { socket } from "../call-upgrade/socket";

let localVideo: HTMLVideoElement
let remoteVideo: HTMLVideoElement

var stream: MediaStream, peer: RTCPeerConnection, senders //初始化要发送的流,和描述文件,通话状态
export function startVideoStream() { //开始传输视频流
  createMedia()
}

export function stopVideoStream() { //停止传输视频流
  stream.getTracks().forEach(async function (track) { //这里得到视频或音频对象
    await track.stop();
    await stream.removeTrack(track)
    stream = null as unknown as any
  })
  peer.close();
  peer = null as unknown as any
  const callingInstance = useCallingStore()
  callingInstance.setIsCalling(false)
  callingInstance.setIsLogin(true)
}

export async function createMedia() { //同步创建本地媒体流
  if (!stream) {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
  }
  localVideo.srcObject = stream; //将媒体流输出到本地video以显示自己
  localVideo.onloadedmetadata = function (e: any) {
    localVideo.play();
  };
  createPeerConnection()
}

export async function createPeerConnection() { //同步初始化描述文件并添加事件
  if (!peer) {
    peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.services.mozilla.com" }],
    })
  }
  stream.getTracks().forEach(async track => {
    peer.addTrack(track, stream); //将本地流附属至peer中
  });
  // await peer.addStream(stream); //旧方法（将本地流附属至peer中）
  peer.addEventListener('addstream', setVideo) //当peer收到其他流时显示另一个video以显示对方
  peer.addEventListener('icecandidate', sendIce) //获取到candidate时，将其发送至服务端，传至对方
  peer.addEventListener('negotiationneeded', sendOffer) //双方约定的协商被完成时才触发该方法
}

export async function showDeviceVersion() {
  const deviceStream = await navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: true,
  })
  
  console.log(peer.getSenders, peer.getSenders());
  peer.getSenders().find(sender => sender.track === stream.getVideoTracks()[0])?.replaceTrack(deviceStream.getVideoTracks()[0])
  // stream = deviceStream
  // localVideo.srcObject = stream; //将媒体流输出到本地video以显示自己
  // localVideo.onloadedmetadata = function (e: any) {
  //   localVideo.play();
  // };
}

export async function showMediaVersion() {
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  })
  // console.log(peer, peer.getSenders());
  
  peer.getSenders().find(sender => sender.track === stream.getVideoTracks()[0])?.replaceTrack(mediaStream.getVideoTracks()[0])
  // stream = mediaStream
  // localVideo.srcObject = stream; //将媒体流输出到本地video以显示自己
  // localVideo.onloadedmetadata = function (e: any) {
  //   localVideo.play();
  // };
}

export function setVideo(data: any) { //播放对方的视频流
  const callingInstance = useCallingStore()
  console.log(data.stream)
  // back.hidden = false //显示挂断按钮
  callingInstance.setIsBack(false)
  // isCalling = true //正在通话
  callingInstance.setIsCalling(true)

  remoteVideo.srcObject = data.stream;
  remoteVideo.onloadedmetadata = function (e: any) {
    remoteVideo.play();
  };
}

export async function sendOffer() { //同步发送offer到服务端，发送给对方
  let offer = await peer.createOffer();
  await peer.setLocalDescription(offer); //peer本地附属offer
  socket.value.emit('_offer', {
    streamData: offer
  });
}

export async function getOffer(data: any) { //接收到offer后，返回answer给对方
  if (!peer) return //等待对方响应，也可以用try catch
  await peer.setRemoteDescription(data.streamData); //peer远程附属offer
  sendAnswer()
}

export async function sendAnswer() {
  let answer = await peer.createAnswer();
  await peer.setLocalDescription((answer)); //peer附属本地answer
  socket.value.emit('_answer', {
    streamData: answer
  });
}

export async function getAnswer(data: any) { //接收到answer后，peer远程附属answer
  await peer.setRemoteDescription(data.streamData);
}

export function sendIce(e: RTCPeerConnectionIceEvent) { //setLocalDescription触发时，发送ICE给对方
  if (!e || !e.candidate) return
  socket.value.emit('_ice', {
    streamData: e.candidate
  });
}

export async function getIce(data: any) { //获取对方的ICE
  if (!peer) return //等待对方响应，也可以用try catch
  var candidate = new RTCIceCandidate(data.streamData)
  await peer.addIceCandidate(candidate)
}
function breakVideoConnect(this: HTMLElement, ev: MouseEvent) {
  throw new Error("Function not implemented.");
}

export const setVideoContainer = (local: HTMLVideoElement, remote: HTMLVideoElement) => {
  localVideo = local
  remoteVideo = remote
}

