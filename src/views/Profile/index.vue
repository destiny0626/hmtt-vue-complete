<template>
  <div class="profile">
    <!-- 未登录的头部 -->
    <div v-if="!user" class="not-login header">
      <img @click="$router.push('/login')" src="@/assets/images/mobile.png" alt="">
      <span>登录 / 注册</span>
    </div>
    <!-- /未登录的头部 -->

    <!-- 已登录的头部 -->
    <div v-else class="login-box header">
      <!-- 用户基本信息 -->
      <div class="user-info">
        <div class="left">
          <img :src="userInfo.photo" />
          <span>{{ userInfo.name }}</span>
        </div>
        <van-button to="/user" type="default">编辑资料</van-button>
      </div>
      <!-- 用户数据 -->
      <div class="user-data">
        <div class="data-item">
          <span>{{ userInfo.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- /已登录的头部 -->

    <!-- 导航 -->
    <van-grid class="myGrid" :column-num="2">
      <van-grid-item icon="photo-o" text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 其他导航 -->
    <div class="out-box">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </div>
    <van-cell @click="onLogout" v-if="user" title="退出" class="logout-btn" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Dialog, Toast } from 'vant'
import { getUserSelfInfo } from '@/api/user.js'
export default {
  data () {
    return {
      userInfo: {}
    }
  },

  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },

  computed: {
    ...mapState(['user'])
  },

  methods: {
    // 点击退出
    onLogout () {
      Dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出该账号?'
      })
        .then(() => {
          this.$store.commit('removeUser')
        })
        .catch(() => {})
    },
    // 获取用户信息
    async loadUserInfo () {
      try {
        const res = await getUserSelfInfo()
        this.userInfo = res
      } catch (err) {
        Toast('获取用户信息失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.profile {

  // 头部公共样式
  .header {
    width: 750px;
    height: 401px;
    background-image: url(~@/assets/images/banner.png);
    background-size: 100% 100%;
  }

  // 未登录的样式
  .not-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 132px;
      height: 132px;
    }
    span {
      font-size: 28px;
      color: #fff;
      margin-top: 10px;
    }
  }

  // 已登录头部样式
  .login-box {
    overflow: hidden;
    .user-info {
      width: 100%;
      height: 132px;
      margin-top: 116px;
      padding:0 32px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        img {
          width: 132px;
          height: 132px;
          border-radius: 50%;
          border: 1px solid #fff;
        }
        span {
          font-size: 30px;
          color: #fff;
          margin-left: 22px;
        }
      }

      .van-button {
        width: 115px;
        height: 32px;
        background: #FFFFFF;
        border-radius: 16px;
        font-size: 20px;
        color: #666;
        padding: 0;
      }
    }
    .user-data {
      width: 100%;
      height: 156px;
      // padding: 0 32px;
      display: flex;
      // box-sizing: border-box;
      .data-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;
        span:nth-child(1) {
          font-size: 26px;
          margin-bottom: 8px;
        }
        span:nth-child(2) {
          font-size: 22px;
        }
      }
    }
  }

  // 导航样式
  .myGrid {
    .toutiao {
      font-size: 45px;
    }

    .toutiao-shoucang {
      color: #EB5253;
    }

    .toutiao-lishi {
      color: #FF9D1D;
    }

  }

  .out-box {
    margin: 10px 0;
  }

  .logout-btn {
    text-align: center;
    color: red;
  }
}
</style>
