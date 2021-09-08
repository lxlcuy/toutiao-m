<!--  -->
<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>
<script>
import { getSearchResult } from '../../../api/search'
export default {
  name: 'SearchResult',
  data () {
    return { list: [], loading: false, finished: false, page: 1, per_page: 20 }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await getSearchResult({
          page: this.page, // 页码
          per_page: this.per_page, // 每页大小
          q: this.searchText
        })
        //  2.将数据添加到列表当中
        const { results } = data.data
        this.list.push(...results)
        // 3.将本次加载的loading关闭
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          this.pge++
        } else {
          this.finished = false
        }
      } catch (err) {
        this.$toast('加载失败,请稍后重试')
      }
    }
  }
}
</script>
<style lang="less"></style>
