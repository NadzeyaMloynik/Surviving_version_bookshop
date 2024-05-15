const Router = require('express')
const router = new Router()
const authorRouter = require('./authorRouter')
const basketRouter = require('./basketRouter')
const genreRouter = require('./genreRouter')
const bookRouter = require('./bookRouter')
const userRouter = require('./userRouter')
const ratingRouter = require('./ratingRouter')

router.use('/user', userRouter)
router.use('/author', authorRouter)
router.use('/basket', basketRouter)
router.use('/book', bookRouter)
router.use('/genre', genreRouter)
router.use('/rating', ratingRouter)

module.exports = router
