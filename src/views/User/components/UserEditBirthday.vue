<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import dayJs from 'dayjs'
import { updateUserProfile } from '@/api/user.js'
// import { Toast } from 'vant'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      currentDate: null,
      minDate: new Date('1900-01-01'),
      maxDate: new Date()
    }
  },

  created () {
    this.currentDate = new Date(this.value)
  },

  methods: {
    async onConfirm (value) {
      this.$toast.loading({
        message: '更新中...',
        duration: 0,
        forbidClick: true
      })
      const formatTime = dayJs(value).format('YYYY-MM-DD')
      try {
        await updateUserProfile({
          birthday: formatTime
        })
        this.$toast.success('更新成功')
        this.$emit('close')
        this.$emit('input', formatTime)
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
