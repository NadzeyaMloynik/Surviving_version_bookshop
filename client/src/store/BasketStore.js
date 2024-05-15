import {makeAutoObservable} from 'mobx';

export default class BasketStore {
    constructor() {
       this._books=[];
        this._boughtBooks=[];
        this._basketId = {};
        this._upt = false;
        makeAutoObservable(this)
    }


    setBoughtBooks(books){
        this._boughtBooks = books;
    }
    setUpt(bool){
        this._upt = bool;
    }
    setBasketId(basketId){
        this._basketId = basketId;
    }
    setBooks(books){
        this._books = books;
    }
    get upt(){return this._upt}
    get books(){return this._books}
    get boughtBooks(){return this._boughtBooks}
    get basketId(){return this._basketId}

}


