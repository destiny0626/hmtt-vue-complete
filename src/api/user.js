import request from '@/utils/request.js'

/**
 * 获取验证码
 * @param {*} mobile 手机号
 * @returns promise
 */
export function getCode (mobile) {
  return request({
    url: '/v1_0/sms/codes/' + mobile
  })
}

/**
 * 登录
 * @param {*} data { mobile, code }
 */
export function login (data) {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}

/**
 * 获取用户自己信息
 * @param {*} token 登陆存的token
 */
export function getUserSelfInfo () {
  return request({
    url: '/v1_0/user'
  })
}

/**
 * 获取用户自己的频道列表
 */
export function getUserSelfChannels () {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 * 新增频道
 * @param {*} channel { id, seq }
 */
export function addUserChannelItem (channel) {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}

/**
 * 删除用户频道
 * @param {*} id 用户id
 */
export function removeUserChannelItem (id) {
  return request({
    url: '/v1_0/user/channels/' + id,
    method: 'DELETE'
  })
}

/**
 * 关注用户
 * @param {*} target 被关注的用户id
 */
export function followUser (target) {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: target
    }
  })
}

/**
 * 取消关注
 * @param {*} target 取消关注的用户id
 */
export function deleteUser (target) {
  return request({
    url: '/v1_0/user/followings/' + target,
    method: 'DELETE'
  })
}

/**
 * 获取个人资料
 */
export function getUserProfile () {
  return request({
    url: '/v1_0/user/profile'
  })
}

/**
 * 更新用户资料
 * @param {*} data {}更新的用户属性
 */
export function updateUserProfile (data) {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

/**
 * 更新头像
 * @param {*} data formData
 */
export function updateUserPhoto (data) {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
