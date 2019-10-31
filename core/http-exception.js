class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(msg = '', errorCode = 1000) {
    super()
    this.code = 400
    this.msg = msg || '参数错误'
    this.errorCode = this.errorCode
  }
}

class NotFound extends HttpException {
  constructor(msg = '', errorCode = 101) {
    super()
    this.code = 200
    this.msg = msg || '资源未找到'
    this.errorCode = this.errorCode || 10000
  }
}

class AuthFailed extends HttpException {
  constructor(msg = '', errorCode = 10004) {
    super()
    this.code = 401
    this.msg = msg || '授权失败'
    this.errorCode = this.errorCode
  }
}

class Forbbiden extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '禁止访问'
    this.errorCode = errorCode || 10006
    this.code = 403
  }
}

class LikeError extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '你已经点赞过'
    this.errorCode = errorCode || 60001
    this.code = 400
  }
}

class DislikeError extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '你已经取消了点赞'
    this.errorCode = errorCode || 60002
    this.code = 400
  }
}

class Success extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 201
    this.msg = msg || 'ok'
    this.errorCode = errorCode || 0
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  AuthFailed,
  Forbbiden,
  LikeError,
  DislikeError
}
