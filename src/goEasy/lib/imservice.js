/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-05 19:28:12
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-22 22:40:33
 */
// import restApi from './restapi'
function Friend(uuid, name, avatar) {
  this.uuid = uuid
  this.name = name
  this.avatar = avatar
}

function Group(uuid, name, avatar, create_userId, userList) {
  this.uuid = uuid
  this.name = name
  this.avatar = avatar
  this.create_userId = create_userId
  this.userList = userList
}

function IMService(goEasy, GoEasy) {
  //当前用户
  this.currentUser = null
  //我的群
  this.groups = []

  // 我的好友
  this.friends = []

  // GoEasy 模块
  this.GoEasy = GoEasy

  //goEasy 实例对象
  this.goEasy = goEasy

  //私聊消息记录，map格式，每个好友对应一个数组
  this.privateMessages = {}

  //群聊消息记录，map格式，每个群对应一个数组
  this.groupMessages = {}

  /*
   * 监听器们
   *
   * 可以在页面里，根据需求，重写以下监听器，
   * 便于当各种事件触发时，页面能够执行对应的响应
   *
   */
  //收到一条私聊消息
  this.onNewPrivateMessageReceive = function (friendId, message) {}
  //收到一条群聊消息
  this.onNewGroupMessageReceive = function (groupId, message) {}
}

//获取群成员
// IMService.prototype.getGroupMembers = function (groupId) {
//   let members = restApi.findGroupMembers(groupId)
//   let membersMap = {}
//   members.map(item => {
//     membersMap[item.uuid] = item
//   })
//   return membersMap
// }

IMService.prototype.setGroup = function (groups) {
  this.groups = groups
}

IMService.prototype.setGroupUser = function (groupId, userIdList) {
  this.groups = this.groups.map(item => {
    if (item.uuid.toString() === groupId.toString()) {
      return { ...item, userList: userIdList }
    } else {
      return item
    }
  })
}

IMService.prototype.getGroupUser = function (groupId) {
  return this.groups.filter(item => {
    return item.uuid.toString() === groupId.toString()
  })[0].userList
}

IMService.prototype.setUser = function (friends) {
  this.friends = friends
}
IMService.prototype.findGroupById = function (groupId) {
  let group = this.groups.filter(group => {
    return group.uuid.toString() === groupId.toString()
  })[0]
  return new Group(
    group.uuid,
    group.name,
    group.avatar,
    group.create_userId,
    group.userList
  )
}

IMService.prototype.findFriendById = function (userId) {
  let user = this.friends.filter(friend => {
    return friend.id.toString() === userId.toString()
  })
  return new Friend(user.uuid, user.name, user.avatar)
}

IMService.prototype.getGroupMessages = function (groupId) {
  if (!this.groupMessages[groupId]) {
    this.groupMessages[groupId] = []
  }
  return this.groupMessages[groupId]
}

IMService.prototype.getPrivateMessages = function (friendId) {
  if (!this.privateMessages[friendId]) {
    this.privateMessages[friendId] = []
  }
  return this.privateMessages[friendId]
}

//连接GoEasy
IMService.prototype.connect = function (currentUser) {
  this.currentUser = currentUser
  let userData = {
    name: this.currentUser.name,
    avatar: this.currentUser.avatar
  }
  //初始化相关的监听器
  this.initialListeners()
  this.goEasy.connect({
    id: this.currentUser.uuid,
    data: userData,
    onSuccess: function () {
      //连接成功
      console.log('GoEasy connect successfully.')
    },
    onFailed: function (error) {
      //连接失败
      console.log(
        'Failed to connect GoEasy, code:' +
          error.code +
          ',error:' +
          error.content
      )
    },
    onProgress: function (attempts) {
      //连接或自动重连中
      console.log('GoEasy is connecting', attempts)
    }
  })
  // this.subscribeGroupMessage(currentUser)
}

IMService.prototype.subscribeGroupMessage = function () {
  let groupIds = this.groups.map(item => item.uuid)
  this.goEasy.im.subscribeGroup({
    groupIds: groupIds,
    onSuccess: function () {
      //订阅成功
      console.log('订阅群消息成功')
    },
    onFailed: function (error) {
      //订阅失败
      console.log('订阅群消息失败')
    }
  })
}

//初始化监听器
IMService.prototype.initialListeners = function () {
  //监听私聊消息
  this.goEasy.im.on(this.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, message => {
    //更新私聊消息记录
    let friendId
    if (this.currentUser.uuid === message.senderId) {
      friendId = message.receiverId
    } else {
      friendId = message.senderId
    }
    let friendMessages = this.getPrivateMessages(friendId)
    friendMessages.push(message)
    //如果页面传入了相应的listener，执行listener
    this.onNewPrivateMessageReceive(friendId, message)
  })

  //监听群聊消息
  this.goEasy.im.on(this.GoEasy.IM_EVENT.GROUP_MESSAGE_RECEIVED, message => {
    let groupId = message.groupId
    //更新群聊消息记录
    let groupMessages = this.getGroupMessages(groupId)
    groupMessages.push(message)
    //如果页面传入了相应的listener，执行listener
    this.onNewGroupMessageReceive(groupId, message)
  })
}

export default IMService
