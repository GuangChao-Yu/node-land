const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/book'
})
const {HotBook} = require('../../models/hot_book')
const {Auth} = require('../../../middlewares/auth')
const {
  PositiveIntegerValidator,
  Searchvalidator,
  AddShortCommentValidator
} = require('../../validators/validators')
const {Book} = require('../../models/book')
const {Comment} = require('../../models/book-comment')
const {success} = require('../../lib/helper')

router.get('/hot_list', async (ctx, next) => {
  const books = await HotBook.getAll()
  ctx.body = books
})

router.get('/:id/detail', async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const book = new Book()
  ctx.body = await book.detail(v.get('path.id'))
})

router.get('/search', async ctx => {
  const v = await new Searchvalidator().validate(ctx)
  const key = encodeURI(v.get('query.q'))
  const start = v.get('query.start') ? v.get('query.start') : 0
  const count = v.get('query.count') ? v.get('query.count') : 20
  const result = await Book.searchFormYuShu(key, count, start)
  ctx.body = result
})

router.get('/favor/count', new Auth().checkToken, async ctx => {
  const count = await Book.getMyFavorBookCount(ctx.auth.uid)
  ctx.body = {count}
})

router.get('/:book_id/favor', new Auth().checkToken, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {id: 'book_id'})
  const result = await Book.getMyBookFavor(ctx.auth.uid, v.get('path.book_id'))
  ctx.body = result
})

router.post('/add/short_comment', new Auth().checkToken, async ctx => {
  const v = await new AddShortCommentValidator().validate(ctx, {id: 'book_id'})
  const result = await Comment.addComment(
    v.get('body.book_id'),
    v.get('body.content')
  )
  if (result) {
    success()
  }
})

router.get('/:book_id/short_comment', new Auth().checkToken, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {id: 'book_id'})
  const result = await Comment.getComments(v.get('path.book_id'))
  ctx.body = result
})

module.exports = router
