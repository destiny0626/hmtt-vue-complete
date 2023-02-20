<template>
  <div>
    <!-- 为什么点击左侧会触发click-left -->
    <!-- 组件内部 在点击左侧按钮的时候通过$emit触发click-left -->
    <van-nav-bar
      :title="comment.reply_count ? comment.reply_count + '条回复' : '暂无回复'"
      @click-left="$emit('close')"
    >
      <template #left>
        <van-icon name="cross" size="18" />
      </template>
    </van-nav-bar>

    <div class="scroll-box">
      <comment-item :comment="comment" />

      <van-cell title="全部回复" />

      <comment-list type="c" :source="comment.com_id + ''" :list="list" />
    </div>

    <div class="post-warp">
      <van-button @click="isShowReplyPostComment = true" round>评论</van-button>
    </div>

    <van-popup v-model="isShowReplyPostComment" position="bottom">
      <!-- 为什么on-success发布成功触发? -->
      <!-- 因为组件内部 发布成功后 通过$emit触发on-success -->
      <comment-post @on-success="onSuccess" :target="comment.com_id + ''" :artId="$route.params.artId" />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '@/components/CommentItem'
import CommentList from './CommentList'
import CommentPost from './CommentPost'
export default {
  data () {
    return {
      list: [],
      isShowReplyPostComment: false
    }
  },

  components: {
    CommentItem,
    CommentList,
    CommentPost
  },

  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  created () {

  },

  methods: {
    // 发布评论成功后触发,并且传了数据
    onSuccess (e) {
      this.list.unshift(e)
      this.isShowReplyPostComment = false
      this.comment.reply_count++
    }
  }
}
</script>

<style scoped lang="less">
.post-warp {
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: hotpink;
  .van-button {
    width: 640px;
    height: 80px;
  }
}

.scroll-box {
  position: absolute;
  width: 100%;
  top: 92px;
  bottom: 100px;
  overflow-y: scroll;
}
</style>
