<template>
  <div class="update-avatar">
    <img :src="img" id="image" />
    <div class="toolbar">
      <span @click="$emit('close')">取消</span>
      <span @click="onConfirm">完成</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user.js'

export default {
  props: {
    img: {
      type: String,
      required: true
    }
  },
  data () {
    return {

    }
  },

  created () {

  },

  mounted () {
    const image = document.getElementById('image')
    this.cropper = new Cropper(image, {
      autoCropArea: 1, // 自动调整裁剪图片
      viewMode: 1, // 只能在裁剪的图片范围内移动
      cropBoxMovable: false, // 禁止裁剪区移动
      aspectRatio: 1,
      dragMode: 'move',
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false
    })
  },

  methods: {
    onConfirm () {
      this.$toast.loading({
        message: '裁剪中...',
        duration: 0,
        forbidClick: true
      })
      // console.log('点击完成')
      // 1. 服务端裁剪
      //  图片传给后端
      //  传裁剪的参数
      // console.log(this.cropper.getData())
      // 2. 前端裁剪
      //  裁剪图片
      //  将裁剪后的图片上传服务器
      // this.cropper.getCroppedCanvas: 得到一个canvas对象
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        // console.log(blob)
        const formData = new FormData()
        formData.append('photo', blob)
        try {
          const res = await updateUserPhoto(formData)
          console.log(res)
          this.$toast.success('上传头像成功')
          this.$emit('close')
          this.$emit('update-photo', res.photo)
        } catch (err) {
          this.$toast.fail('上传头像失败')
        }
      })
      // console.log(this.cropper.getCroppedCanvas())
      // document.body.appendChild(this.cropper.getCroppedCanvas())
    }
  }
}
</script>

<style scoped lang="less">
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
