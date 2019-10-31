const Router = require('koa-router')
const router = new Router({prefix: '/v1/classic'})

const {
  PositiveIntegerValidator,
  LikeValidator
} = require('../../validators/validators')
const {Flow} = require('../../models/flow')
const {Art} = require('../../models/art')
const {Favor} = require('../../models/favor')

const {Auth} = require('../../../middlewares/auth')

router.get('/latest', new Auth().checkToken, async (ctx, next) => {
  const flow = await Flow.findOne({
    order: [['index', 'DESC']]
  })
  const art = await Art.getData(flow.art_id, flow.type)
  const likeLatest = await Favor.userLikeIt(
    flow.art_id,
    flow.type,
    ctx.auth.uid
  )
  // art.dataValues.index = flow.index
  art.setDataValue('like_status', likeLatest)
  art.setDataValue('index', flow.index)
  ctx.body = art
})

router.get('/:index/next', new Auth().checkToken, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {id: 'index'})
  const index = v.get('path.index')
  const flow = await Flow.findOne({
    where: {
      index: index + 1
    }
  })
  if (!flow) {
    throw new global.errs.NotFound('未找到期刊')
  }
  const art = await Art.getData(flow.art_id, flow.type)
  const likeNext = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
  art.setDataValue('like_status', likeNext)
  art.setDataValue('index', flow.index)
  ctx.body = art
})

router.get('/:index/pre', new Auth().checkToken, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {id: 'index'})
  const index = v.get('path.index')
  const flow = await Flow.findOne({
    where: {
      index: index - 1
    }
  })
  if (!flow) {
    throw new global.errs.NotFound('没有上一期了')
  }
  const art = await Art.getData(flow.art_id, flow.type)
  const likePre = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
  art.setDataValue('like_status', likePre)
  art.setDataValue('index', flow.index)
  ctx.body = art
})

router.get('/:type/:id/favor', new Auth().checkToken, async ctx => {
  const v = await new LikeValidator().validate(ctx)
  const type = parseInt(v.get('path.type'))
  const id = v.get('path.id')
  const art = await Art.getData(id, type)
  if (!art) {
    throw new global.errs.NotFound()
  }
  const like = await Favor.userLikeIt(id, type, ctx.auth.uid)
  ctx.body = {
    fav_nums: art.fav_nums,
    like_status: like
  }
})

router.get('/:type/:id/', new Auth().checkToken, async ctx => {
  const v = await new LikeValidator().validate(ctx)
  const type = parseInt(v.get('path.type'))
  const id = v.get('path.id')
  const art = await Art.getData(id, type)
  if (!art) {
    throw new global.errs.NotFound()
  }
  const like = await Favor.userLikeIt(id, type, ctx.auth.uid)
  art.setDataValue('like_status', like)
  ctx.body = art
})

router.get('/favor', new Auth().checkToken, async ctx => {
  const uid = ctx.auth.uid
  ctx.body = await Favor.getMyClassicFavors(uid)
})

module.exports = router
