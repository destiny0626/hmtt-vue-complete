<template>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    v-if="!isFollowed"
    @click="onFollowed"
    :loading="isFollowLoading"
  >关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    round
    size="small"
    @click="onFollowed"
    :loading="isFollowLoading"
  >已关注</van-button>
</template>

<script>
import { followUser, deleteUser } from '@/api/user.js'
export default {
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    autId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      isFollowLoading: false // 关注按钮的loading
    }
  },

  // 用来进行v-model的自定义解析
  model: {
    prop: 'isFollowed',
    event: 'updateFollowed'
  },

  created () {

  },

  methods: {
    // 点击关注或已关注
    async onFollowed () {
      this.isFollowLoading = true
      try {
        if (this.isFollowed) {
          // 点击的是已关注 做: 取消关注
          await deleteUser(this.autId)
        } else {
          // 点击的是关注 做: 关注功能
          await followUser(this.autId)
        }
        // 请求成功了
        this.$emit('updateFollowed', !this.isFollowed)
        this.isFollowLoading = false
      } catch (err) {
        // 失败了
        console.dir(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
