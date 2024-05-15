const Router = require('express')
const router = new Router()
const genreController = require('../controllers/genreController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware(process.env.ADMIN_ROLE), genreController.create)
router.get('/', genreController.getAll)

module.exports = router