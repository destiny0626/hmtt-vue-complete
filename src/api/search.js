import request from '@/utils/request.js'

/**
 * 根据关键字获取联想建议
 * @param {*} q 搜索的关键字
 */
export function getSearchSuggestion (q) {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取搜索结果
 * @param {*} params { page, per_page, q }
 */
export function getSearchResults (params) {
  return request({
    url: '/v1_0/search',
    params
  })
}
