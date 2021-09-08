<!--  -->
<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highligt(text)"></div
    ></van-cell>
  </div>
</template>
<script>
import { getSearchSuggestions } from '../../../api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestions: []
    }
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
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
        console.log(data)
      } catch (err) {
        this.$toast('获取失败，稍后重试', err)
      }
    },
    highligt (text) {
      const highligtStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highligtStr)
    }
  },
  watch: {
    searchText: {
      // 当searchText 发生改变时 就会带哦用 handler函数
      // 注意handler 函数时固定的
      //   handler (value) {
      //     this.loadSearchSuggestions(value)
      //   },
      // debounce 函数
      // 参数1：一个函数
      // 参数2：延迟时间，单位时毫秒
      // 返回值：防抖之后的函数
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 200),

      immediate: true // 该回调将会在侦听之后被立即调用
    }
  }
}
</script>
<style lang="less">
.search-suggestion {
  .active {
    color: red !important;
  }
}
</style>
