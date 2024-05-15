const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const {check} = require("express-validator")
/*
router.post('/registration',[
        check('email','Username is undefined').isEmail(),
        check('password','Password is incorrect(>8 and <20)').isLength({min:8,max:20}),]
    , userController.registration)*/
router.post('/registration',[
    check('email', 'email should be valid').isEmail(),
    check('password', 'password should be valid').isStrongPassword({
        minLength: 1,
        maxLength: 20,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
    })]
    , userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.delete('/:id',checkRoleMiddleware(process.env.ADMIN_ROLE), userController.delete)
router.get('/', checkRoleMiddleware(process.env.ADMIN_ROLE), userController.getAll)

module.exports = router