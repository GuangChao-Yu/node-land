const Router = require('koa-router')
const router = new Router()

const {ParameterException} = require('../../../core/http-exception')
const {PositiveIntegerValidator} = require('../../validators/validators')

router.post('/v1/:id/classic/latest', async (ctx, next) => {
  const path = ctx.params // 用koa后去路径参数
  const query = ctx.request.query
  const header = ctx.request.header
  const body = ctx.request.body

  const v = await new PositiveIntegerValidator().validate(ctx)
  // const id = v.get('path.id', (parsed = false))

  // if (!Object.keys(query).length) {
  //   const error = new ParameterException()
  //   throw error
  // }

  let classic = 'classic'
  ctx.body = {classic}
})

module.exports = router
