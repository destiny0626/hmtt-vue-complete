<template>
  <van-icon
    :color="value ? '#3296fa' : '#777'"
    :name="value ? 'star' : 'star-o'"
    @click="onCollect"
  />
</template>

<script>
import { addCollectArticle, deleteCollectArticle } from '@/api/article.js'
import { Toast } from 'vant'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    artId: {
      type: [Number, Object, String],
      required: true
    }
  },
  data () {
    return {

    }
  },

  created () {

  },

  methods: {
    async onCollect () {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      })
      try {
        if (this.value) {
          // 代表已收藏 实现 取消收藏
          await deleteCollectArticle(this.artId + '')
        } else {
          // 代表未收藏 实现 收藏文章
          await addCollectArticle(this.artId + '')
        }
        // 肯定会成功
        this.$emit('input', !this.value)
        Toast.success('操作成功')
      } catch (err) {
        Toast.succes('操作失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
