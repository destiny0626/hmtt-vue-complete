<template>
  <div class="searchHistory">
    <!-- <p v-html="msg"></p> -->
    <van-cell @click="onSearch(item)" v-for="item in suggestions" :key="item" icon="search">
      <template #title>
        <div v-html="highText(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
      // msg: '<span style="color: hotpink;">h</span>ello'
    }
  },
  beforeDestroy () {
    clearTimeout(this.setid)
  },
  watch: {
    searchText: {
      immediate: true,
      handler (newVal) {
        if (this.setid) {
          clearTimeout(this.setid)
        }
        this.setid = setTimeout(async () => {
          const res = await getSearchSuggestion(newVal)
          this.suggestions = res.options
        }, 700)
      }
    }
  },

  created () {

  },

  methods: {
    // 高亮
    highText (item) {
      const replaceStr = '<span style="color: red">' + this.searchText + '</span>'
      // replace: 参数一: 要替换的内容 参数二: 替换后的文本
      const reg = new RegExp(this.searchText, 'gi')
      return item.replace(reg, replaceStr)

      // [] new Array()
      // {} new Object()
      // function () {} new Function()
      // const a = 'hello'
      // /a/gi new RegExp(a, 'gi') /hello/
    },
    // 点击搜索
    onSearch (item) {
      // console.log(item)
      this.$emit('onSearch', item)
    }
  }
}
</script>

<style scoped>

</style>
