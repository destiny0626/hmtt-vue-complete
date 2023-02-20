<template>
  <div>
    <!-- @cancel: 自定义事件 -->
    <!-- 为什么点击取消的时候可以触发cancel事件? -->
    <!-- 因为组件内部给取消注册了点击事件,点击事件触发$emit('cancel') -->
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女']
    }
  },

  created () {

  },

  methods: {
    async onConfirm (val, index) {
      Toast.loading({
        message: '更新中...',
        duration: 0,
        forbidClick: true
      })
      try {
        await updateUserProfile({
          gender: index
        })
        Toast.success('更新成功')
        this.$emit('close')
        this.$emit('input', index)
      } catch (err) {
        Toast.success('更新失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
