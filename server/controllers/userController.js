const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Basket, Book} = require('../models/models');
const {validationResult } = require('express-validator');

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next){
        try{
            const errors = validationResult(req)
            const {email, password, repPassword, role} = req.body;
            if(!errors.isEmpty()) {
                return res.status(400).send({message: "Логин должен быть в формате email.\nПароль должен содержать:" +
                        "\n1 символ большого регистра" +
                        "\n1 символ малого регистра" +
                        "\n1 специальный символ" +
                        "\n1 цифру" +
                        "\nбыть длиннее 8 символов" ,errors})
            }
            const candidate = await User.findOne({where: {email}})
            if( candidate){
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            if(password !== repPassword){
                return next(ApiError.badRequest('Пароли не совпадают'+ password+ ' ' + repPassword))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, role, password: hashPassword})
            const baskets = await Basket.create({userId: user.id})
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch(e)
        {
            return next(ApiError.badRequest(e.message))
        }
    }
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
    async delete(req, res, next){
        try {
            const { id } = req.params;
            const user = await User.findOne({ where: {id} });
            const basket = await Basket.findOne({where: {userId: user.id}})

            if (!user || !basket) {
                return res.status(404).json({ message: 'Пользователь не найдена' });
            }
            if(user.role !== process.env.ADMIN_ROLE && basket){
                await user.destroy();
                await basket.destroy();
                return res.status(200).json({ message: 'Пользователь успешно удален' });
            }
        } catch (error) {
            next(ApiError.badRequest({ message: 'Ошибка сервера' }));
        }
    }
    async getAll(req, res, next){
        try{
            let {limit, page} = req.query;
            page = page || 1
            limit = limit || 10;
            let offset = page * limit - limit;
            let users
            users = await User.findAndCountAll({
                where: {role: 'USER'}, limit, offset})
            return res.json(users)
        } catch (e){
            return next(ApiError.internal('Что-то пошло не так'))
        }
    }
}

module.exports = new UserController()
