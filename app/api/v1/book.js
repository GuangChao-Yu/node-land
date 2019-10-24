const Router = require('koa-router')
const router = new Router()
const {PositiveIntegerValidator} = require('../../validators/validators')

router.get('/v1/book/latest', async (ctx, next) => {
  let classic = 'book'
  const v = await new PositiveIntegerValidator().validate(ctx)
  console.log(ctx.query.id)
  let a = v.get('query.id')
  ctx.body = {
    id: a
  }
  // const id = v.get('query.id', (parsed = false))
  // ctx.body = {classic}
})

module.exports = router
