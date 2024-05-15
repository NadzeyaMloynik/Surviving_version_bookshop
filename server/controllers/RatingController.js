const { Book, Rating } = require("../models/models");
const ApiError = require("../error/ApiError");
class RatingController {
    async ratingBook(req, res, next) {
        try {
            const { bookId, rate, userId } = req.body;
            let book = await  Book.findOne({ where: { id: bookId } })
            let rating = await Rating.findOne({ where: { userId, bookId } });
            if(rating) {
                return res.status(400).json({ error: "Вы уже выставили рейтинг на эту книгу" });
            }
            else {
                const rating =  await Rating.create({bookId, rate, userId});
                let rateSum = 0;
                const ratings = await Rating.findAll({ where: { bookId } })
                ratings.forEach(rating => {
                    rateSum += rating.rate;
                })
                book.rating = (rateSum/ratings.length).toFixed(2);
                await book.save();
                return res.json(book)
            }
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new RatingController();
