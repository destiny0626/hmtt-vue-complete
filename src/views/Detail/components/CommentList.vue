<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <comment-item @click-reply="$emit('click-reply', $event)" :comment="item" v-for="item in list" :key="item.com_id + ''" />
  </van-list>
</template>

<script>
import { getCommentList } from '@/api/article.js'
import CommentItem from '@/components/CommentItem.vue'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      offset: null, // 获取每一页的标识, 第一页不用传,第二页(第一页的结果返回)
      limit: 10
    }
  },
  props: {
    // 获取评论列表的数据类型
    type: {
      type: String,
      default: 'a'
    },
    // 传递的 源id 文章id或评论id
    source: {
      type: [Number, Object, String],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },

  components: {
    CommentItem
  },

  created () {

  },

  methods: {
    async onLoad () {
      // 1. 发送请求
      try {
        const { results, last_id: lastId, total_count: total } = await getCommentList({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        this.$emit('on-success', total)
        this.list.push(...results)
        // 结束这一次的请求
        this.loading = false
        // 所有数据请求完成
        if (!results.length) {
          this.finished = true
        } else {
          this.offset = lastId
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
