import request from '../utils/request'

export const getvideodetail = id => {
  return request({
    method: 'GET',
    url: '/video/detail',
    params: {
      id
    }
  })
}

export const getrelatedvideo = id => {
  return request({
    method: 'GET',
    url: '/related/allvideo',
    params: {
      id
    }
  })
}

export const getvideourl = id => {
  return request({
    method: 'GET',
    url: '/video/url',
    params: {
      id
    }
  })
}
