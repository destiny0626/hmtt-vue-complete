<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="value"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      :disabled="!value"
      class="post-btn"
      @click="onPost"
    >发布</van-button>
  </div>
</template>

<script>
import { PostComment } from '@/api/article.js'
import { Toast } from 'vant'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    // 发送请求的目标id(可能是评论id/文章id)
    target: {
      type: [String, Number, Object],
      required: true
    },
    // 父组件没有artId 肯定想对文章进行评论
    // 发布评论的评论的时候需要
    artId: {
      type: [String, Number, Object],
      default: null
    }
  },
  data () {
    return {
      value: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 点击发布
    async onPost () {
      // loading
      Toast.loading({
        message: '发布中...',
        duration: 0,
        forbidClick: true
      })
      try {
        const res = await PostComment({
          target: this.target + '',
          content: this.value,
          art_id: this.artId
        })
        console.log(res.new_obj)
        // 成功提示
        Toast.success('评论成功')
        // 能够触发当前组件标签上的一个自定义事件
        this.$emit('on-success', res.new_obj)
        this.value = ''
      } catch (err) {
        // 失败提示
        Toast.fail('评论失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
