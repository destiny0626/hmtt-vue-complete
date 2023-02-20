<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
    class="page-nav-bar"
    title="个人信息"
    left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->

    <input @change="onChange" type="file" hidden ref="inputFile" />
    <van-cell @click="$refs.inputFile.click()" title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="user.photo"
      />
    </van-cell>
    <van-cell title="昵称" @click="isShowEdit = true" :value="user.name" is-link />
    <van-cell title="性别" @click="isShowEditSex = true" :value="user.gender ? '女' : '男'" is-link />
    <van-cell title="生日" @click="isShowEditBirthday = true" :value="user.birthday" is-link />

    <!-- 编辑昵称的弹层 -->
    <van-popup v-model="isShowEdit" position="bottom" :style="{ height: '100%' }">
      <user-edit v-if="isShowEdit" v-model="user.name" @close="isShowEdit = false" />
    </van-popup>

    <!-- 编辑性别的弹层 -->
    <van-popup v-model="isShowEditSex" position="bottom">
      <user-edit-sex v-if="isShowEditSex" v-model="user.gender" @close="isShowEditSex = false" />
    </van-popup>

    <!-- 编辑生日的弹层 -->
    <van-popup v-model="isShowEditBirthday" position="bottom">
      <user-edit-birthday v-model="user.birthday" @close="isShowEditBirthday = false" />
    </van-popup>

    <!-- 编辑头像的弹层 -->
    <van-popup v-model="isShowEditAvatar" style="height: 100%" position="bottom">
      <user-edit-avatar v-if="isShowEditAvatar" @update-photo="user.photo = $event" @close="isShowEditAvatar = false" :img="imgUrl" />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UserEdit from './components/UserEdit'
import UserEditSex from './components/UserEditSex'
import UserEditBirthday from './components/UserEditBirthday'
import UserEditAvatar from './components/UserEditAvatar'
export default {
  data () {
    return {
      user: {}, // 保存用户信息
      isShowEdit: false, // 控制编辑弹层
      isShowEditSex: false,
      isShowEditBirthday: false,
      isShowEditAvatar: false,
      imgUrl: ''
    }
  },

  components: {
    UserEdit,
    UserEditSex,
    UserEditBirthday,
    UserEditAvatar
  },

  created () {
    this.loadUserProfile()
  },

  methods: {
    async loadUserProfile () {
      try {
        const res = await getUserProfile()
        this.user = res
      } catch (err) {
        console.log('toast提示')
      }
    },
    // 选择文件的输入框发生变化
    onChange (e) {
      // console.log(123)
      if (e.target.value === '') return
      this.isShowEditAvatar = true
      // 如果不进行裁剪,e.target.files[0] 可以直接交给后端
      this.imgUrl = URL.createObjectURL(e.target.files[0])
      e.target.value = ''
    }
  }
}
</script>

<style scoped lang='less'>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  /deep/.van-nav-bar__arrow {
    color: #fff;
  }
}
</style>
