<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button @click="isEdit = !isEdit" color="red" class="edit-btn" plain type="primary" round size="small">
        {{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>

    <van-grid :gutter="10" class="my-grid" :border="false">
      <van-grid-item
        :class="{ active: index === active }"
        :text="item.name"
        :icon="isEdit && index !== 0 ? 'close' : ''"
        v-for="(item, index) in channels"
        :key="item.id"
        @click="onMyClick(index, item.id)"
      />
    </van-grid>

    <van-cell title="推荐频道" :border="false"></van-cell>

    <van-grid icon-size="0.5rem" :gutter="10" direction="horizontal" class="my-grid" :border="false">
      <van-grid-item @click="onRecommendChannel(item)" v-for="item in recommendChannels" :key="item.id" icon="plus" :text="item.name" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannel } from '@/api/article.js'
import { Toast } from 'vant'
import { mapState } from 'vuex'
import { setStorage } from '@/utils/storage.js'
import { addUserChannelItem, removeUserChannelItem } from '@/api/user.js'

export default {
  props: {
    channels: {
      type: Array,
      required: true
    },
    // 记录的高亮的索引
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isEdit: false,
      allChannels: []
    }
  },

  computed: {
    ...mapState(['user']),
    // 推荐频道
    recommendChannels () {
      // 对allChannels进行筛选
      // allChannels的每一项 是否在channels里,如果没有在channels,属于recommendChannels
      // const arr = this.allChannels.filter(item => {
      //   const flag = this.channels.some(item2 => {
      //     return item2.id === item.id
      //   })
      //   return !flag
      // })
      // return arr
      return this.allChannels.filter(item => {
        return !this.channels.some(item2 => item2.id === item.id)
      })
    }
  },

  created () {
    this.loadAllChannel()
  },

  methods: {
    // 点击了我的频道
    onMyClick (index, id) {
      if (this.isEdit) {
        // 处于编辑状态
        if (index === 0) return
        // 如果删除的是 高亮前面的前面 高亮的值减一
        if (index <= this.active) {
          // 删除的是高亮的前面的
          // 可以触发当前组件标签上的一个自定义事件
          this.$emit('setActive')
        }
        this.channels.splice(index, 1)
        // 删除持久化
        this.deleteChannelStorage(id)
      } else {
        // 处于非编辑状态
        this.$emit('onGo', index)
      }
    },
    // 删除持久化
    async deleteChannelStorage (id) {
      // 未登录
      if (!this.user) return setStorage('MY-CHANNELS', this.channels)
      // 已登录
      Toast.loading({
        message: '删除中...',
        forbidClick: true,
        duration: 0 // 持续展示 toast
      })
      try {
        await removeUserChannelItem(id)
        Toast.success('删除成功')
      } catch (err) {
        Toast.fail('删除失败')
      }
    },
    // 加载所有频道
    async loadAllChannel () {
      try {
        const res = await getAllChannel()
        this.allChannels = res.channels
      } catch (err) {
        Toast('获取所有频道失败')
      }
    },
    // 点击了推荐频道
    async onRecommendChannel (obj) {
      // 只是操作了页面的显示
      this.channels.push(obj)

      Toast.loading({
        message: '添加中...',
        forbidClick: true,
        duration: 0 // 持续展示 toast
      })

      // 进行数据持久化
      if (this.user) {
        // 登录
        try {
          await addUserChannelItem({
            id: obj.id,
            seq: this.channels.length
          })
          Toast.success('添加成功')
        } catch (err) {
          Toast.fail('添加失败')
        }
      } else {
        setStorage('MY-CHANNELS', this.channels)
        Toast.success('添加成功')
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  .edit-btn {
    width: 104px;
    height: 48px;
  }

  /deep/.my-grid {
    .van-grid-item {
      width: 160px;
      height: 86px;
      border-radius: 6px;
    }
    .van-grid-item__content {
      background: #F4F5F6;
    }

    .van-icon-close {
      font-size: 35px;
      position: absolute;
      top: -10.5px;
      right: 5px;
    }
    .van-grid-item__icon+.van-grid-item__text {
      margin-top: 0;
    }

    .active {
      .van-grid-item__text {
        color: hotpink;
      }
    }
  }
}
</style>
