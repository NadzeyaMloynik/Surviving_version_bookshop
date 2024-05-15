const Router = require('express')
const router = new Router()
const AuthorController = require('../controllers/authorController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware(process.env.ADMIN_ROLE), AuthorController.create)
router.get('/', AuthorController.getAll)

module.exports = router