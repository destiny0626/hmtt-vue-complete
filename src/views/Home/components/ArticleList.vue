<template>
  <!--  v-model="isLoading" 控制下拉是否处于加载中 -->
  <div class="articleList">
    <van-pull-refresh
      success-duration="1500"
      :success-text="tipText"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <!-- v-model="loading" 控制当前是否在加载中 如果在加载中是不会下载下一页的数据 -->
      <!-- :finished="finished" 控制数据有没有加载完成 如果加载完成 没有数据了 不会再去加载下一页 如果没有加载完成, 还可以加载下一页 -->
      <!-- :error.sync="error" 控制是否显示错误 true -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell v-for="item in list" :key="item.art_id" :title="item.title" /> -->
        <article-item :row="item" v-for="item in list" :key="item.art_id + ''" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article.js'
import ArticleItem from '@/components/ArticleItem'
export default {
  props: {
    // 父组件传递的频道id
    channelId: {
      type: Number,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: Date.now(),
      error: false,
      isLoading: false,
      tipText: ''
    }
  },

  created () {

  },

  methods: {
    // 1. 进入页面,并且显示list列表组件就会触发
    // 2. 加载的数据没有占满一屏, 继续加载下一页
    // 3. 触底的时候
    async onLoad () {
      try {
        // 1. 发送请求获取数据
        const res = await getArticleList({
          channel_id: this.channelId,
          with_top: 1,
          timestamp: this.timestamp
        })

        // 用来做测试的代码
        if (Math.random() > 0.5) {
          console.lg(12)
        }
        // 2. 保存数据
        this.list.push(...res.results)
        // 更新时间戳
        this.timestamp = res.pre_timestamp
        // 3. 让当前这一次的加载状态结束
        this.loading = false
        // 4. 数据全部加载完成
        if (!res.results.length) {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    // 触发下拉
    async onRefresh () {
      try {
        // 1. 发送请求获取数据
        const res = await getArticleList({
          channel_id: this.channelId,
          with_top: 1,
          timestamp: Date.now()
        })
        // 用来做测试的代码
        if (Math.random() > 0.5) {
          console.lg(12)
        }
        // console.log(res)
        this.list.unshift(...res.results)
        this.isLoading = false
        this.tipText = '刷新成功'
      } catch (err) {
        this.isLoading = false
        this.tipText = '刷新失败,稍后重试'
      }
    }
  }
}
</script>

<style scoped>
.articleList {
  height: 80vh;
  overflow-y: scroll;
}
</style>
