<template>
  <div class="searchHistory">
    <!-- 标题 -->
    <van-cell title="搜索历史">
      <template>
        <van-icon @click="isDelete = true" v-if="!isDelete" name="delete-o" />
        <div v-else>
          <!-- <span @click="history = []">全部删除</span> -->
          <!-- <span @click="history.splice(0)">全部删除</span> -->
          <span @click="$emit('clear')">全部删除</span>
          <span @click="isDelete = false" style="margin-left: 7px;">完成</span>
        </div>
      </template>
    </van-cell>

    <!-- 搜索列表 -->
    <van-cell @click="onClickHistory(item)" :title="item" v-for="item in history" :key="item">
      <template v-if="isDelete">
        <van-icon name="close" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    history: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDelete: false
    }
  },

  created () {

  },

  methods: {
    // 点击搜索历史
    onClickHistory (value) {
      if (this.isDelete) {
        // 处于删除状态
        const index = this.history.indexOf(value)
        this.history.splice(index, 1)
      } else {
        // 搜索
        this.$emit('onSearch', value)
      }
    }
  }
}
</script>

<style scoped>

</style>
