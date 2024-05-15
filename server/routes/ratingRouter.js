const Router = require('express')
const router = new Router()
const RatingController = require('../controllers/RatingController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware(process.env.USER_ROLE), RatingController.ratingBook)
module.exports = router