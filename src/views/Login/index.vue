<template>
  <div class="login">
    <!-- 头部导航 -->
    <van-nav-bar
      title="登录"
      class="page-nav-bar"
    >
      <template #left>
        <van-icon color="#fff" @click="$router.back()" name="cross" />
      </template>
    </van-nav-bar>

    <!-- 表单区域 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="form.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '手机号码格式不正确' }
        ]"
      >
       <template #left-icon>
         <i class="toutiao toutiao-shouji"></i>
       </template>
      </van-field>
      <van-field
        v-model="form.code"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^[0-9]{6}$/, message: '验证码格式不正确' }
        ]"
      >
        <template #left-icon>
         <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <!-- native-type="button" 变为普通按钮 -->
          <van-count-down
          @finish="isShowCountDown = false"
          v-if="isShowCountDown"
          :time="60 * 1000" format="ss s" />
          <van-button
          v-else
          @click="onSend"
          native-type="button"
          class="send-btn"
          size="small"
          type="primary">
          发送验证码
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button
          class="login-btn"
          round
          block
          type="info"
          native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getCode, login } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      },
      isShowCountDown: false // 是否显示倒计时
    }
  },

  created () {

  },

  methods: {
    async onSubmit () {
      try {
        const res = await login(this.form)
        // 存的是data {}
        this.$store.commit('initUser', res)
        this.$router.push('/profile')
      } catch (err) {
        Toast.fail('登录失败')
      }
    },
    // 点击发送验证码
    async onSend () {
      // 1. 校验手机号
      // validate: 参数是输入框的name值
      try {
        await this.$refs.form.validate('mobile')
        await getCode(this.form.mobile)
        Toast.success('亲, 发送成了')
        this.isShowCountDown = true
      } catch (err) {
        // 当错误里面没有response,代表错误不是 请求导致的
        // 不是请求导致的 就肯定是 校验导致的错误
        if (!err.response) return
        if (err.response.status === 429) {
          return Toast.fail('亲,发送频繁,稍后再试')
        }
        Toast.fail('网络异常')
      }
    }
  }
}
</script>

<style scoped lang="less">
.login {
  .login-btn {
    width: 694px;
    height: 88px;
    background: #6DB4FB;
    border: none;
    border-radius: 10px;
  }

  .toutiao {
    font-size: 37px;
  }

  .send-btn {
    width: 152px;
    height: 46px;
    background: #EDEDED;
    border: none;
    border-radius: 23px;
    padding: 0;
    font-size: 22px;
    color: #666666;
  }
}
</style>
