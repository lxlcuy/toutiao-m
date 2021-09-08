<!--  -->
<template>
  <div class="search-container">
    <!-- 搜索栏 -->

    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @focus="issearchTextShow = false"
      />
    </form>
    <!-- /搜索栏 -->
    <!-- 搜索结果 -->
    <search-result
      v-if="issearchTextShow"
      :search-text="searchText"
    ></search-result>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      :search-text="searchText"
      v-else-if="searchText"
      @search="onSearch"
    ></search-suggestion>
    <!-- /联想建议 -->
    <!-- 搜索历史记录 -->

    <search-history
      v-else
      :search-histories="searchHistories"
      @clear-update-search-histories="searchHistories = []"
      @search="onSearch"
    ></search-history>
    <!-- /搜索历史记录 -->
  </div>
</template>
<script>
import SearchHistory from './component/search-history.vue'
import SearchResult from './component/search-result.vue'
import SearchSuggestion from './component/search-suggest.vue'
import { setItem, getItem } from '../../utils/storage'
export default {
  name: 'MySearch',

  data () {
    return {
      searchText: '',
      issearchTextShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []
    }
  },
  props: {},
  components: { SearchHistory, SearchResult, SearchSuggestion },
  created () {},
  mounted () {},
  watch: {
    searchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val
      // 存储搜索历史记录
      // 要求不要有重复记录，最新的排在前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      // 更新数组

      this.searchHistories.unshift(val)
      // console.log(val)
      this.issearchTextShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>
<style lang="less">
.search-container {
  .search-container van-search {
    margin-top: 10px;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
