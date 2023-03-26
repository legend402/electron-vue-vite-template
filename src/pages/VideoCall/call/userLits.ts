import { useCallingStore } from "@/store/call/useCallingStore"
import { socket } from "../call-upgrade/socket"
import { startVideoStream } from "./video"
export function createChatList(data: any) { //新建用户列表

  const callingInstance = useCallingStore()
  console.log(data.userIds)
  callingInstance.setUserList((Object.values(data.userIds) as string[]).filter(
    (item: string) => item !== callingInstance.currentUserName
  ))
}

export function videoStart(name: string) { //用户点击列表某个用户时发送邀请至服务端
  const callingInstance = useCallingStore()
  socket.value.emit('inviteVideo', {
    myId: callingInstance.currentUserName,
    otherId: name,
    type: 'inviteVideo'
  });
}

export function startVideoChat(otherId: string) { //初始化视频聊天

  const callingInstance = useCallingStore()
  callingInstance.setIsLogin(true)
  localStorage.setItem('otherId', otherId) //将对方的id保存
  startVideoStream()
}
