const Koa = require('koa')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init.js')
const catchError = require('./middlewares/exceptions')

const app = new Koa()
app.use(catchError)
app.use(parser())

InitManager.initCore(app)
// api http://bl.7yue.pro/dev/index.html

app.listen(3000)
