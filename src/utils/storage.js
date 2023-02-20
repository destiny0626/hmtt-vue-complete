// 封装本地存储的方法

/**
 * 获取数据
 * @param {*} key 获取本地存储的名字
 */
export function getStorage (key) {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    // 肯定是 普通字符串
    return data
  }
  // data 有可能需要 JOSN.parse 处理 数据类型 JSON字符串
  // data 不需要 JSON.parse 处理 不是JSON字符串
}

/**
 * 本地存储
 * @param {*} key 给本地存储的名字
 * @param {*} value 给本地存储的值
 */
export function setStorage (key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

/**
 * 删除存储
 * @param {*} key 删除存储的名称
 */
export function removeStorage (key) {
  localStorage.removeItem(key)
}
