function isThisType(val) {
  for (let key in this) {
    if (this[key] === val) {
      return true
    }
  }
  return false
}

const LoginType = {
  USER_INIT_PROGRAM: 100, //小程序
  USER_EMAIL: 101, // email登录
  USER_MOBILE: 102, // 手机号登录
  USER_ACCOUNT: 103,
  isThisType // 账号密码登录
}

module.exports = {
  LoginType
}
