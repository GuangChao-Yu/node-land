const Koa = require('koa')
const path = require('path')
const parser = require('koa-bodyparser')
const static = require('koa-static')
const InitManager = require('./core/init.js')
const catchError = require('./middlewares/exceptions')

const app = new Koa()
app.use(catchError)
app.use(parser())
app.use(static(path.join(__dirname, './static')))

InitManager.initCore(app)
// api http://bl.7yue.pro/dev/index.html

app.listen(3000)
