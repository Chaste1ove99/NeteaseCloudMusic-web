import request from '@/utils/request.js'

/**
 * 获取推荐歌单
 */
export const getRecommondList = () => {
  return request({
    method: 'GET',
    url: '/personalized',
    params: {
      limit: 12
    }
  })
}

/**
 * 独家放送
 */
export const getOnlyByCloud = () => {
  return request({
    method: 'GET',
    url: '/personalized/privatecontent'
  })
}

/**
 * 推荐MV
 */
export const getRecommondMV = () => {
  return request({
    method: 'GET',
    url: '/personalized/mv'
  })
}

/**
 * 推荐电台
 */
export const getRecommondChannel = () => {
  return request({
    method: 'GET',
    url: 'personalized/djprogram'
  })
}
