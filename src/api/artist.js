import request from '../utils/request'

// 获取歌手单曲
export const getArtistSong = id => {
  return request({
    url: '/artists',
    method: 'GET',
    params: {
      id
    }
  })
}

// 获取歌手专辑
export const getArtistAlbum = (id, page) => {
  return request({
    url: '/artist/album',
    method: 'GET',
    params: {
      id,
      limit: 20,
      offset: (page) * 20
    }
  })
}

// 获取歌手MV概况
export const getArtistMV = id => {
  return request({
    url: '/artist/mv',
    method: 'GET',
    params: {
      id
    }
  })
}

// 获取相似歌手
export const getSimiArtist = id => {
  return request({
    url: '/simi/artist',
    method: 'GET',
    params: {
      id
    }
  })
}

// 获取歌手描述
export const getArtistDesc = id => {
  return request({
    url: '/artist/desc',
    method: 'GET',
    params: {
      id
    }
  })
}
