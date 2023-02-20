<template>
  <div class="layout">
    <!-- 路由占位 -->
    <router-view />
    <!-- 底部tabbar -->
    <van-tabbar route>
      <van-tabbar-item to="/">
        首页
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        视频
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        问答
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        {{ $store.state.user ? '我的' : '未登录' }}
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {

    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped lang="less">
.layout {
  padding-bottom: 100px;
  .toutiao {
    font-size: 40px;
  }
}
</style>
