const router = require('koa-router')()

//假设service是3000端口,那么访问http://localhost:3000/react/about
router.prefix('/react')

router.get('/about', (ctx, next) => {
  ctx.body = {
    list: [
       {name: '张三', age: 18},
       {name: '李四', age: 19},
       {name: '王五', age: 20}
    ] 
  }
})

router.post('/login', (ctx, next) => {
  const {username, password} = ctx.request.body
  if (username !== 'professor' && password !== '123') {
    ctx.body = {
      error: true
    }
    return
  }
  ctx.body = {
    error: false
  }
})

module.exports = router