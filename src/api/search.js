import request from '@/utils/request'

// export const getSearchSuggestions = q => {
//   return request({
//     method: 'GET',
//     url: '/app/v1_0/suggestion',
//     params: {
//       q
//     }
//   })

export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    // params 选项用来配置 Query 参数
    params: { q }
  })
}

export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    // params 选项用来配置 Query 参数
    params
  })
}
