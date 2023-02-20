import request from '@/utils/request.js'

/**
 * 获取文章列表
 * @param {*} params { channel_id, with_top, timestamp }
 */
export function getArticleList (params) {
  return request({
    url: '/v1_1/articles',
    params
  })
}

/**
 * 获取所有频道列表
 */
export function getAllChannel () {
  return request({
    url: '/v1_0/channels'
  })
}

/**
 * 获取文章详情
 * @param {*} id 文章id
 */
export function getArticleDetail (id) {
  return request({
    url: '/v1_0/articles/' + id
  })
}

/**
 * 添加收藏
 * @param {*} target 要收藏的文章id
 */
export function addCollectArticle (target) {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

/**
 * 添加收藏
 * @param {*} target 要收藏的文章id
 */
export function deleteCollectArticle (target) {
  return request({
    method: 'DELETE',
    url: '/v1_0/article/collections/' + target
  })
}

/**
 * 获取评论列表
 * @param {*} params {}
 */
export function getCommentList (params) {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

/**
 *
 * @param {*} data { 目标id: 文章id/评论id, 评论内容, 文章id: 对评论进行评论 }
 */
export function PostComment (data) {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
