<template>
  <div class="search">
    <!-- form 组件的作用可以使ios手机的键盘 发送变为搜索 -->
    <form action="/">
      <van-search
        background="#3296fa"
        v-model.trim="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isShowRes = false"
      />
    </form>

    <search-results v-if="isShowRes" :searchText="value" />
    <search-history @clear="history = []" @onSearch="onSearch" :history="history" v-else-if="!value" />
    <search-suggestion @onSearch="onSearch" :searchText="value" v-else />
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory'
import SearchSuggestion from './components/SearchSuggestion'
import SearchResults from './components/SearchResults'
import { setStorage, getStorage } from '@/utils/storage.js'
export default {
  name: 'search',
  data () {
    return {
      value: '',
      isShowRes: false,
      history: getStorage('TT-HISTORY') || [] // 存储搜索历史
    }
  },

  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResults
  },

  created () {

  },

  watch: {
    history: {
      deep: true,
      handler (val) {
        setStorage('TT-HISTORY', val)
      }
    }
  },

  methods: {
    onSearch (val) {
      this.value = val
      this.isShowRes = true
      // 进行搜索历史的存储
      this.history.unshift(val)
      this.history = [...new Set(this.history)]
    }
  }
}
</script>

<style scoped lang="less">
.search {
  .van-search__action {
    color: #fff;
  }
}
</style>
