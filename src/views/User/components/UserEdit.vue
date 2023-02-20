<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />

    <van-field
      v-model.trim="message"
      type="textarea"
      maxlength="7"
      placeholder="请输入新的昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { Toast } from 'vant'
import { updateUserProfile } from '@/api/user.js'
export default {
  data () {
    return {
      message: ''
    }
  },

  props: {
    value: {
      type: String,
      required: true
    }
  },

  created () {
    this.message = this.value
  },

  methods: {
    async onClickRight () {
      if (this.message === '') return Toast('请填写昵称')
      try {
        await updateUserProfile({
          name: this.message
        })
        Toast.success('更新成功')
        this.$emit('close')
        this.$emit('input', this.message)
      } catch (err) {
        // console.dir(err)
        if (err.response && err.response.status === 409) {
          Toast.fail('昵称已存在')
          return
        }
        Toast.fail('更新失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
