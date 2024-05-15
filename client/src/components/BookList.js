import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./BookItem";
import BookItem from "./BookItem";

const BookList = observer( ()=> {
    const {book} = useContext(Context)

    function findAuthorById(authorArray, authorId) {
        const foundAuthor = authorArray.find(author => author.id === authorId);
        return foundAuthor || null;
    }
    function findGenreById(genresArray, genreId) {
        const foundGenre = genresArray.find(genre => genre.id === genreId);
        return foundGenre || null;
    }

    return (
        <Row  className = "d-flex">
            {book.books.map(data => {
                const author = findAuthorById(book.authors,data.authorId)
                const genre = findGenreById(book.genres, data.genreId)
                    return (
                        <BookItem
                            key = {data.id}
                            oneBook = {data}
                            author= {author}
                            genre= {genre}
                        />)}
            )}
        </Row>
    );
});

export default BookList;