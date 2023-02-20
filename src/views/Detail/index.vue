<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="isLoading" class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="articles.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articles.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articles.aut_photo"
          />
          <div slot="title" class="user-name">{{ articles.aut_name }}</div>
          <div slot="label" class="publish-date">{{ articles.pubdate | relativeTime}}</div>
          <!-- 关注组件 -->
          <!-- <follow-user
            :isFollowed="articles.is_followed"
            @updateFollowed="articles.is_followed = $event"
            :autId="articles.aut_id"
          /> -->

          <!-- v-model -->
          <!-- :value="articles.is_followed" -->
          <!-- @input="articles.is_followed = $event" -->
          <!-- 指定解析 -->
          <!-- :isFollowed="articles.is_followed" -->
          <!-- @updateFollowed="articles.is_followed = $event" -->
          <follow-user
            v-model="articles.is_followed"
            :autId="articles.aut_id"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div ref="content" class="article-content markdown-body" v-html="articles.content"></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论列表组件 -->
        <!-- 展示文章的评论列表 -->
        <comment-list @click-reply="onClickReply" :list="list" @on-success="total = $event" :source="artId" />

        <!-- 评论的评论列表 -->
        <!-- <comment-list :source="评论id" type="c" /> -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isShowPostCommentPopup = true"
          >写评论</van-button>
          <van-icon
            name="comment-o"
            :badge="total"
            color="#777"
          />
          <collect-article v-model="articles.is_collected" :artId="articles.art_id" />
          <van-icon
            color="#777"
            name="good-job-o"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="is404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="loadArticleDetail" class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 对文章进行发布评论的弹层 -->
    <van-popup v-model="isShowPostCommentPopup" position="bottom">
      <!--  -->
      <comment-post @on-success="onSuccess" :target="artId" />
    </van-popup>

    <!-- 对文章进行发布评论的弹层 -->
    <van-popup v-model="isShowPostReplyCommentPopup" style="height: 100%" position="bottom">
      <comment-reply v-if="isShowPostReplyCommentPopup" :comment="comment" @close="isShowPostReplyCommentPopup = false" />
    </van-popup>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article.js'
import { ImagePreview } from 'vant'
import './github-markdown.css'
import FollowUser from '@/components/FollowUser'
import CollectArticle from '@/components/CollectArticle'
import CommentList from './components/CommentList'
import CommentPost from './components/CommentPost'
import CommentReply from './components/CommentReply'
export default {
  props: {
    artId: {
      type: String,
      required: true
    }
  },
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  data () {
    return {
      articles: {
      },
      isLoading: true, // 是否处于加载中
      is404: false, // 是否404的错误
      total: 0,
      isShowPostCommentPopup: false,
      isShowPostReplyCommentPopup: false,
      list: [], // 存评论列表的数据
      comment: {}
    }
  },
  created () {
    this.loadArticleDetail()
  },
  methods: {
    // 加载详情数据的方法
    async loadArticleDetail () {
      this.isLoading = true
      try {
        this.articles = await getArticleDetail(this.artId)
        this.isLoading = false
        this.$nextTick(_ => {
          this.imagePreview()
        })
      } catch (err) {
        // 判断是否为404的错误
        if (err.response && err.response.status === 404) {
          this.is404 = true
        }
        this.isLoading = false
      }
    },
    // 图片预览
    imagePreview () {
      // 带图片id: 140967
      const contentEl = this.$refs.content
      const imgs = contentEl.querySelectorAll('img')
      const images = []
      imgs.forEach((item, index) => {
        images.push(item.src)
        item.onclick = function () {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    onSuccess (e) {
      this.isShowPostCommentPopup = false
      this.list.unshift(e)
    },
    // 孙子组件触发的
    onClickReply (e) {
      this.isShowPostReplyCommentPopup = true
      // console.log(e)
      this.comment = e
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
