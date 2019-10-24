const Router = require('koa-router')
const {RegisterValidator} = require('../../validators/validators')
const {User} = require('../../models/user')

const router = new Router({
  prefix: '/v1/user'
})
// 注册
router.post('/register', async ctx => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password1'),
    nickname: v.get('body.nickname')
  }
  await User.create(user)
  throw new global.errs.Success()
})

module.exports = router
