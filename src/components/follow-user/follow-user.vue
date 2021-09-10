<!--  -->
<template>
  <div>
    <van-button
      class="follow-btn"
      round
      size="small"
      v-if="isFollowed"
      @click="onFollow"
      :loading="loading"
      >已关注</van-button
    >
    <van-button
      v-else
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      @click="onFollow"
      :loading="loading"
      >关注</van-button
    >
  </div>
</template>
<script>
import { addFollow, deleteFollow } from '../../api/user'
export default {
  name: 'Follow-User',
  data () {
    return {
      loading: false
    }
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    }
  },
  components: {},
  created () {
    console.log(this.isFollowed)
  },
  mounted () {},
  methods: {
    async onFollow () {
      this.followLoading = true // 显示loading状态
      try {
        if (this.article.is_followed) {
          // 已关注，取消关注
          await addFollow(this.article.aut_id)
        } else {
          // 未关注，添加关注
          await deleteFollow(this.article.aut_id)
        }
      } catch (err) {
        console.log('shibai ')
      }
      this.article.is_followed = !this.article.is_followed
      this.followLoading = false
    }
  }
}
</script>
<style lang="less"></style>
