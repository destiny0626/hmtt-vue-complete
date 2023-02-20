// 对axios进行封装
import axios from "axios";
import store from "@/store";
import JSONBig from "json-bigint";

const request = axios.create({
  baseURL: "http://toutiao-app.itheima.net",
  timeout: 3000,
  transformResponse: [
    function (data) {
      // 1. 找到了处理的时机
      try {
        return JSONBig.parse(data); // a.num + ''
      } catch (err) {
        return data;
      }
    },
  ],
});

// 拦截所有利用request发出的请求
request.interceptors.request.use((config) => {
  // config: 当前这次请求的所有配置和请求信息
  // console.log(getStorage('tt-user'))
  if (store.state.user) {
    config.headers.Authorization = "Bearer " + store.state.user.token;
  }
  return config;
});

// 拦截所有响应的结果
request.interceptors.response.use((res) => {
  return res.data.data;
});

export default request;
