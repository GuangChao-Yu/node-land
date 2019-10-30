module.exports = {
  // dev 开发环境 prod 生产环境
  env: 'dev',
  database: {
    dbName: 'yugc',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '198987yugc'
  },
  security: {
    secretKey: 'yuguangchao',
    expiresIn: 60 * 60 * 24 //秒单位,过期时间，暂设置为1天
  },
  wx: {
    appId: '',
    appSecret: '',
    loginUrl:
      'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}
