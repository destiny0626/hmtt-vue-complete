<template>
  <div class="searchHistory">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search.js'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false
    }
  },

  created () {

  },

  methods: {
    async onLoad () {
      try {
        // 1. 发送请求
        const res = await getSearchResults({
          page: this.page,
          per_page: 10,
          q: this.searchText
        })
        if (Math.random() > 0.5) {
          console.lg(12)
        }
        // 2. 保存数据
        this.list.push(...res.results)
        // 3. 加载状态结束
        this.loading = false
        // 4. 数据是否全部加载完成
        if (!res.results.length) {
          // 数据全部加载完成
          this.finished = true
        } else {
          this.page++
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
