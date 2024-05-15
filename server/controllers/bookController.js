const uuid = require('uuid');
const path = require('path');
const {Book, Book_Info} = require("../models/models");
const ApiError = require("../error/ApiError");
const {where} = require("sequelize");

class BookController {
    async create(req, res, next) {
        try {
            let {name, price, authorId, genreId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const book = await Book.create({name, price, authorId, genreId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    Book_Info.create({
                        title: i.title,
                        description: i.description,
                        bookId: book.id
                    })
                )
            }

            return res.json(book)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {genreId, authorId, limit, page} = req.query;
        page = page || 1
        limit = limit || 10;
        let offset = page * limit - limit;
        let books
        if (!authorId && !genreId) {
            books = await Book.findAndCountAll({limit, offset})
        }
        if (!genreId && authorId) {
            books = await Book.findAndCountAll({where: {authorId}, limit, offset})
        }
        if (genreId && !authorId) {
            books = await Book.findAndCountAll({where: {genreId}, limit, offset})
        }
        if (genreId && authorId) {
            books = await Book.findAndCountAll({where: {genreId, authorId}, limit, offset})
        }
        return res.json(books)
    }

    async getOne(req, res) {
        const {id} = req.params
        const book = await Book.findOne(
            {
                where: {id},
                include: [{model: Book_Info, as: 'info'}]
            }
        )
        return res.json(book)
    }

    async delete(req, res, next) {
        try {
        const { id } = req.params;
        const book = await Book.findOne({ where: {id} });

        if (!book) {
            return res.status(404).json({ message: 'Книга не найдена' });
        }

        await book.destroy();
        return res.status(200).json({ message: 'Книга успешно удалена' });
        } catch (error) {
            next(ApiError.badRequest({ message: 'Ошибка сервера' }));
        }
    }
    async change(req, res, next) {
        try {
            const { id } = req.params;
            const { name, price, authorId, genreId, info} = req.body;
            const book = await Book.findOne({where: {id}});
            if (!book) {
                return next(ApiError.badRequest({ message: 'Книга не найдена' }));
            }
            try{
                const {img} = req.files;
                if(img) {
                    let fileName = uuid.v4() + ".jpg"
                    await img.mv(path.resolve(__dirname, '..', 'static', fileName))
                    book.img = fileName;
                }
            }
            catch (e) {
                console.error(e);
            }

            if (name) book.name = name;
            if (price) book.price = price;
            if (authorId) book.authorId = authorId;
            if (genreId) book.genreId = genreId;

            await book.save();

            // Обновляем информацию о книге
            if (info) {
                const infoData = JSON.parse(info);

                // Удаляем существующую информацию о книге
                await Book_Info.destroy({ where: { bookId: id } });

                // Создаем новую информацию о книге
                for (const i of infoData) {
                    await Book_Info.create({
                        title: i.title,
                        description: i.description,
                        bookId: id
                    });
                }
            }

            return res.status(200).json({ message: 'Данные о книге успешно изменены' });
        } catch (error) {
            // Обработка ошибки сервера
            next(ApiError.badRequest({ message: 'Ошибка сервера' }));
        }
    }


}

module.exports = new BookController()

