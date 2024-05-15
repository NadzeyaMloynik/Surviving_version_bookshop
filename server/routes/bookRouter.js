const Router = require('express')
const router = new Router()
const bookController = require('../controllers/bookController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware(process.env.ADMIN_ROLE), bookController.create)
router.get('/', bookController.getAll)
router.delete('/:id', checkRoleMiddleware(process.env.ADMIN_ROLE),bookController.delete)
router.get('/:id', bookController.getOne)
router.post('/:id', bookController.change)

module.exports = router