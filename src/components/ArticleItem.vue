<template>
  <div class="articleItem">
    <van-cell :to="'/detail/' + row.art_id" :title="row.title">
      <!-- 自定义label -->
      <template #label>
        <div class="image-box" v-if="row.cover.type === 3">
          <van-image
            width="100"
            height="100"
            v-for="(item, index) in row.cover.images"
            :key="index"
            :src="item"
          />
        </div>
        <span>{{ row.aut_name }}</span>
        <span class="comment-num">{{ row.comm_count }}评论</span>
        <span>{{ row.pubdate | relativeTime }}</span>
      </template>
      <!-- 自定义右侧内容 -->
      <template>
        <van-image
          class="right-img"
          v-if="row.cover.type === 1"
          :src="row.cover.images[0]"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    row: {
      type: Object,
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

  }
}
</script>

<style scoped lang="less">
.articleItem {
  .comment-num {
    margin: 0 15px;
  }

  // 三张封面
  .image-box {
    display: flex;
    justify-content: space-between;
  }

  .right-img {
    width: 232px;
    height: 146px;
  }
}
</style>
