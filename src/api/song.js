import request from '@/utils/request.js'
/**
 * 获取音乐详情
 */
export const getSongDetail = id => {
  return request({
    method: 'GET',
    url: '/song/detail',
    params: {
      ids: id
    }
  })
}

/**
 * 获取音乐url 可选参数br 最大999000
 */
export const getSongUrl = id => {
  return request({
    method: 'GET',
    url: '/song/url',
    params: {
      id,
      br: 320000
    }
  })
}

/**
 * 新碟上架
 */
export const getTopAlbum = page => {
  return request({
    method: 'GET',
    url: '/top/album',
    params: {
      limit: 20,
      offset: (page) * 20
    }
  })
}

/**
 * 获取全部新碟
 */
export const getNewAlbum = () => {
  return request({
    method: 'GET',
    url: '/album/new',
    params: {
      limit: 100
    }
  })
}

/**
 * 新歌速递
 */
export const getTopSong = type => {
  return request({
    method: 'GET',
    url: '/top/song',
    params: {
      type
    }
  })
}

/**
 * 获取专辑
 */
export const getAlbum = id => {
  return request({
    method: 'GET',
    url: '/album',
    params: {
      id
    }
  })
}
