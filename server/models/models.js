const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Basket_book = sequelize.define('basket_book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    state: {type: DataTypes.STRING, defaultValue: 'В рассмотрении'},
    isDelivered: {type: DataTypes.BOOLEAN, defaultValue: false},
    isBought: {type: DataTypes.BOOLEAN, defaultValue: false},
    isReceived: {type: DataTypes.BOOLEAN, defaultValue: false},
})


const Book = sequelize.define('book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.FLOAT, allowNull: false},
    rating: {type: DataTypes.FLOAT, defaultValue: 0},
    img: {type: DataTypes.STRING,allowNull: false, defaultValue: 'none'}
})

const Author = sequelize.define('author', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Genre = sequelize.define('genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.DOUBLE, allowNull: false},
})

const Book_Info = sequelize.define('book_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false}
})

const AuthorGenres = sequelize.define( 'AuthorGenre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(Basket_book)
Basket_book.belongsTo(Basket)

Author.hasMany(Book)
Book.belongsTo(Author)
Genre.hasMany(Book)
Book.belongsTo(Genre)

Book.hasMany(Rating)
Rating.belongsTo(Book)

Book.hasMany(Basket_book)
Basket_book.belongsTo(Book)

Book.hasMany(Book_Info, {as: 'info'})
Book_Info.belongsTo(Book)

Author.belongsToMany(Genre, {through: AuthorGenres})
Genre.belongsToMany(Author, {through: AuthorGenres})

module.exports = {
    User,
    Basket,
    Basket_book,
    Book,
    Author,
    Genre,
    Rating,
    AuthorGenres,
    Book_Info
}