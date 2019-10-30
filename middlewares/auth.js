const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }

  get checkToken() {
    return async (ctx, next) => {
      // token 检查
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token不合法'
      if (!userToken || !userToken.name) {
        throw new global.errs.Forbbiden(errMsg)
      }
      const key = global.config.security.secretKey
      try {
        var decode = jwt.verify(userToken.name, key)
      } catch (error) {
        if (error.name == 'TokenExpiredError') {
          errMsg = 'token令牌过期'
          throw new global.errs.Forbbiden(errMsg)
        }
        throw new global.errs.Forbbiden(errMsg)
      }

      if (decode.scope < this.level) {
        errMsg = '没有权限'
        throw new global.errs.Forbbiden(errMsg)
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      await next()
    }
  }

  static verifyToken(token) {
    const key = global.config.security.secretKey
    try {
      jwt.verify(token, key)
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = {
  Auth
}
