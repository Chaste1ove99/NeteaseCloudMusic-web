import request from '@/utils/request.js'

/**
 * 获取推荐歌单
 */
export const getRecommondList = () => {
  return request({
    method: 'GET',
    url: '/personalized',
    params: {
      limit: 10
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
