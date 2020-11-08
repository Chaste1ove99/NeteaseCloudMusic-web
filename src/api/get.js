import request from '@/utils/request.js'

/**
 * 手机登录
 */
export const loginbyMobile = user => {
  //  返回请求结果
  return request({
    method: 'POST',
    url: '/login/cellphone/',
    params: {
      phone: user.mobile,
      password: user.password
    }
  })
}

/**
 * 邮箱登录
 */
export const loginbyEmail = user => {
  return request({
    method: 'POST',
    url: '/login',
    params: {
      email: user.email,
      password: user.password
    }
  })
}

/**
 * 获取验证码
 */
export const sendCode = user => {
  return request({
    method: 'POST',
    url: '/captcha/sent',
    params: {
      phone: user.mobile
    }
  })
}

/**
 * 对验证码进行验证
 */
export const checkCode = user => {
  return request({
    method: 'POST',
    url: '/captcha/verify',
    params: {
      phone: user.mobile,
      captcha: user.code
    }
  })
}

/**
 * 注册账号
 */
export const register = user => {
  return request({
    method: 'POST',
    url: '/register/cellphone',
    params: {
      captcha: user.code,
      phone: user.mobile,
      password: user.password,
      nickname: user.nickname
    }
  })
}
/**
 * 检查手机号是否被注册
 */
export const checkMobile = user => {
  return request({
    method: 'POST',
    url: '/cellphone/existence/check',
    params: {
      phone: user.mobile
    }
  })
}

/**
 * 顶部栏搜索
 */
export const search = keywords => {
  return request({
    method: 'GET',
    url: '/seach/multimatch',
    params: {
      keywords
    }
  })
}

/**
 * 搜索建议
 */
export const searchAdvice = keywords => {
  return request({
    method: 'GET',
    url: '/search/suggest',
    params: {
      keywords
    }
  })
}
