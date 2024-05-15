const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.delete('/:id', checkRoleMiddleware(process.env.USER_ROLE), basketController.remove)
router.post('/', checkRoleMiddleware(process.env.USER_ROLE), basketController.add)
router.post('/buy', checkRoleMiddleware(process.env.USER_ROLE), basketController.buy)
router.post('/confirm', checkRoleMiddleware(process.env.ADMIN_ROLE), basketController.order_confirm)
router.post('/state', checkRoleMiddleware(process.env.ADMIN_ROLE), basketController.order_state)
router.get('/', checkRoleMiddleware(process.env.USER_ROLE), basketController.getBasket)
router.get('/all', checkRoleMiddleware(process.env.ADMIN_ROLE) ,basketController.getAllProducts)
module.exports = router

