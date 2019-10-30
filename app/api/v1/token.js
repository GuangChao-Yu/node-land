const Router = require('koa-router')

const {
  TokenValidator,
  NotEmptyValidator
} = require('../../validators/validators')
const {LoginType} = require('../../lib/enum')
const {User} = require('../../models/user')
const {generateToken} = require('../../../core/util')
const {Auth} = require('../../../middlewares/auth')
const {WXManager} = require('../../services/wx')

const router = new Router({
  prefix: '/v1/token'
})

router.post('/', async ctx => {
  const v = await new TokenValidator().validate(ctx)
  let token
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break
    case LoginType.USER_INIT_PROGRAM:
      token = await WXManager.codeToToken(v.get('body.account'))
      break
    default:
      throw new global.errs.ParameterException('没有相应处理函数')
      break
  }
  ctx.body = {
    token
  }
})

router.post('/verify', async ctx => {
  // token
  const v = await new NotEmptyValidator().validate(ctx)
  const result = Auth.verifyToken(v.get('body.token'))
  ctx.body = {
    is_valid: result
  }
})

async function emailLogin(ac5count, secret) {
  const user = await User.verifyEmailPassWord(account, secret)
  return generateToken(user.id, Auth.USER)
}

module.exports = router
