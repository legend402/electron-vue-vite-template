import { useCallingStore } from "@/store/call/useCallingStore";
import { createChatList, startVideoChat } from "../call/userLits";
import { getIce, getOffer, getAnswer, stopVideoStream } from "../call/video";
import io, { type Socket } from 'socket.io-client'
import { getVueInstance } from "@/utils";
import type { ModalOptions, ToastOptions } from "vuestic-ui/web-components";

const socket: {
  value: Socket
} = {
  value: null as unknown as any
}

export {
  socket
}

let confirmFn: (options: string | ModalOptions) => Promise<boolean>, toastFn: (options: string | ToastOptions) => string | null

export function initSocket(token: string) {//获取到用户输入的id并传到服务端
  socket.value = io('wss://hanyj.top?token=' + token, {
    autoConnect: false
  });
  socket.value.open();
  socket.value.on('open', socketOpen); //连接登录
  socket.value.on('disconnect', socketClose); //连接断开
  socket.value.on('dataChange', createChatList); //新增人员
  socket.value.on('inviteVideoHandler', inviteVideoHandler); //被邀请视频
  socket.value.on('askVideoHandler', askVideoHandler); //视频邀请结果
  socket.value.on('ice', getIce); //从服务端接收ice
  socket.value.on('offer', getOffer); //从服务端接收offer
  socket.value.on('answer', getAnswer); //从服务端接收answer
  socket.value.on('break', stopVideoStream) //挂断视频通话
}

function socketClose(reason: string) { //主动或被动关闭socket
  console.log(reason)
  localStorage.removeItem("token")
}

function socketOpen(data: any) { //socket开启
  if (!data.result) { //当服务端找到相同id时跳出连接
    console.log(data.msg)
    return;
  }
  createChatList(data) //创建用户列表
  localStorage.setItem('token', data.token)
  const callingInstance = useCallingStore()
  // login.hidden = true
  callingInstance.setIsLogin(true)
  callingInstance.setCurrentUsername(data.token)
  // myName.textContent = localStorage.token
}

async function inviteVideoHandler(data: any) { //当用户被邀请时执行
  const callingInstance = useCallingStore()
  let allow = 0
  if (callingInstance.isCalling) {
    toastFn('正在通话中')
    allow = -1 //正在通话
  } else {
    const res = await confirmFn(data.msg)
    if (res) {
      allow = 1
      startVideoChat(data.token) //用户点击同意后开始初始化视频聊天
      localStorage.setItem('roomNo', data.roomNo) //将房间号保存
    }
  }
  socket.value.emit('askVideo', {
    myId: localStorage.token,
    otherId: data.token,
    type: 'askVideo',
    allow
  });
}

function askVideoHandler(data: any) { //获取被邀请用户的回复
  console.log(data.msg)
  if (data.allow == -1) {
    toastFn('当前用户正在通话中')
    return //通话中
  }
  if (data.allow) {
    localStorage.setItem('roomNo', data.roomNo) //将房间号保存
    startVideoChat(data.token)
  }
}

export function breakVideoConnect() {
  console.log(localStorage.getItem('roomNo'))
  socket.value.emit('_break', {
    roomNo: localStorage.getItem('roomNo')
  });
}


export function setToastAndConfirm(confirm: typeof confirmFn, toast: typeof toastFn) {
  confirmFn = confirm
  toastFn = toast
}
