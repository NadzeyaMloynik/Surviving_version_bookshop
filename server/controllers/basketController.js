const { Basket_book, Basket, Book} = require("../models/models");
const ApiError = require("../error/ApiError");


class BasketController {
    async getAllProducts(req, res, next) {
        try {
            let products = await Basket_book.findAll({
                include: [{ model: Book }]
            });
            return res.json(products);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params;

            const product = await Basket_book.findOne({ where: { id } });

            if (!product) {
                return res.status(404).json({ error: "Продукт не найден" });
            }

            await product.destroy();

            return res.json({ message: "Успешно удалено" });
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async add(req, res, next) {
        try {
            const { basketId, bookId } = req.body;

            if (!basketId || !bookId) {
                return res.status(400).json({ error: "Неверный формат данных" });
            }

            const basket_book = await Basket_book.create({ basketId, bookId });

            return res.json(basket_book);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getBasket(req, res, next) {
        try {
            const {userId} = req.query;
            const basket = await Basket.findOne({ where: { userId } });
            let products = await Basket_book.findAll({
                where: {basketId: basket.id},
                include: [{ model: Book }]
            });
            if (products.length > 0) {
                return res.json(products);
            }
            else return res.json(basket.id)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async buy(req, res, next){
        try {
            const {idList} = req.body;
            for (const id of idList) {
                const basket_book = await Basket_book.findOne({ where: { id } });
                basket_book.isBought = true;
                await basket_book.save();
            }
            return res.json({message: "Книга(и) куплена"})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async order_confirm(req, res, next){
        try {
            const {id} = req.body;
            const basket_book = await Basket_book.findOne({ where: { id } });
            basket_book.isDelivered = true;
            await basket_book.save();
            return res.json({message: "Книга доставлена"})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async order_state(req, res, next){
        try {
            const {id, state} = req.body;
            const basket_book = await Basket_book.findOne({ where: { id } });
            basket_book.state = state;
            await basket_book.save();
            return res.json({message: "Статус доставки изменен"})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketController();