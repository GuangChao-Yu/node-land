const Router = require('koa-router')

const {TokenValidator} = require('../../validators/validators')
const {LoginType} = require('../../lib/enum')
const {User} = require('../../models/user')

const router = new Router({
  prefix: '/v1/token'
})

router.post('/', async ctx => {
  const v = await new TokenValidator().validate(ctx)
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      await emailLogin(v.get('body.account'), v.get('body.secret'))
      break
    case LoginType.USER_INIT_PROGRAM:
      break
    default:
      throw new global.errs.ParameterException('没有相应处理函数')
      break
  }
})

async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassWord(account, secret)
}

module.exports = router
