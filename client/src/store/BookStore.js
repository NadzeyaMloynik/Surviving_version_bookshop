import {makeAutoObservable} from 'mobx';

export default class BookStore {
    constructor() {
       this._genres = []
        this._authors = []
        this._books = []
        this._allBooks = []
        this._selectedAuthor={};
        this._selectedGenre={};
        this._page=1;
        this._totalCount=0;
        this._limit=8
        this._upt = false // update trigger
        makeAutoObservable(this)
    }
    setAllBooks(books){this._allBooks=books}
    setUpt(bool) {this._upt = bool}
    setAuthors(authors){this._authors = authors}
    setGenres(genres){this._genres = genres}
    setBooks(books){this._books = books}

    setSelectedGenre(genre){this._selectedGenre = genre}
    setSelectedAuthor(author){this._selectedAuthor = author}

    setPage(page){this._page=page}
    setTotalCount(total){this._totalCount=total}

    get authors(){return this._authors}
    get books(){return this._books}
    get genres(){return this._genres}
    get selectedGenre(){return this._selectedGenre}
    get selectedAuthor(){return this._selectedAuthor}
    get page(){return this._page}
    get totalCount(){return this._totalCount}
    get limit(){return this._limit}
    get upt(){return this._upt;}
    get allBooks() {return this._allBooks}
}
