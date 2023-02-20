<template>
  <div class="home">
    <!-- 头部导航 -->
    <van-nav-bar
      title="搜索"
      class="page-nav-bar"
      fixed
    >
      <template #title>
        <van-button to="/search" class="search-btn" icon="search" type="primary">搜索</van-button>
      </template>
    </van-nav-bar>

    <!-- 滑动导航 -->
    <van-tabs sticky offset-top="1.22rem" class="home-tab" v-model="active" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <article-list :channelId="item.id" />
      </van-tab>
      <template #nav-right>
        <div class="placeholder-box"></div>
        <div class="right-menu" @click="isShowEditPopup = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>

    <!-- 编辑频道弹层 -->
    <van-popup
      closeable
      v-model="isShowEditPopup"
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '90%' }"
      class="editPopup"
    >
      <channel-edit @onGo="onGo" @setActive="active--" :channels="channels" :active="active" />
    </van-popup>
  </div>
</template>

<script>
import { getUserSelfChannels } from '@/api/user.js'
import { Toast } from 'vant'
import ArticleList from './components/ArticleList'
import ChannelEdit from './components/ChannelEdit'
import { getStorage } from '@/utils/storage.js'
export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      channels: [], // 我的频道
      isShowEditPopup: false
    }
  },

  components: {
    ArticleList,
    ChannelEdit
  },

  created () {
    this.loadUserChannels()
  },

  methods: {
    // 加载用户频道列表
    async loadUserChannels () {
      try {
        // 采用本地数据
        // 未登录 并且 本地有数据 才会使用本地数据
        const storageData = getStorage('MY-CHANNELS')
        if (!this.$store.state.user && storageData) {
          this.channels = storageData
          return false
        }
        const res = await getUserSelfChannels()
        this.channels = res.channels
      } catch (err) {
        Toast.fail('获取用户频道列表失败')
      }
    },
    onGo (e) {
      this.active = e
      this.isShowEditPopup = false
    }
  }
}
</script>

<style scoped lang="less">
.home {
  padding-top: 100px;
  .search-btn {
    width: 555px;
    height: 64px;
    background: rgba(255, 255, 255, .2);
    border: none;
    border-radius: 32px;
  }
  /deep/.van-nav-bar__title {
    max-width: unset;
  }

  .van-icon-search {
    color: #fff;
  }

  /deep/.home-tab {
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #EDEFF3;
      height: 82px;
      .van-tab__text {
        font-size: 28px;
        color: #777;
      }
    }
    .van-tabs__wrap {
      height: 82px;
      border-bottom: 1px solid #EDEFF3;
    }

    .van-tab--active {
      .van-tab__text {
        font-size: 30px;
        color: #333;
      }
    }

    .van-tabs__line {
      width: 31px;
      height: 6px;
      background: #3296FA;
      border-radius: 3px;
      bottom: 8px;
    }

    .van-tabs__nav--line {
      padding: 0;
    }

    .right-menu {
      width: 66px;
      height: 82px;
      background-color: #fff;
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 40px;
      }
      &::before {
        content: '';
        width: 1px;
        height: 58px;
        position: absolute;
        left: 0;
        top: 12px;
        background-image: url(~@/assets/images/gradient-gray-line.png);
        background-size: 100% 100%;
      }
    }

    .placeholder-box {
      width: 66px;
      flex-shrink: 0;
    }
  }

  .editPopup {
    padding-top: 100px;
  }
}
</style>
