import React, {useContext, useEffect, useState} from 'react';
import AddAdm from "./AddAdm";
import {Context} from "../index";
import {fetchAuthors, fetchBooks, fetchGenres} from "../http/BookAPI";
import Row from "react-bootstrap/Row";
import {Button} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import AuthorBar from "./AuthorBar";
import GenreBar from "./GenreBar";
import Container from "react-bootstrap/Container";
import BookList from "./BookList";
import Pages from "./Pages";
import AdminBookList from "./AdminBookList";
import {observer} from "mobx-react-lite";

const AdminBooks = observer( () => {
    const { book } = useContext(Context);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        book.setSelectedAuthor(null);
        book.setSelectedGenre(null);

        fetchAuthors().then(data => book.setAuthors(data));
        fetchGenres().then(data => book.setGenres(data));
        fetchBooks(null, null, 8, 1).then(data => {
            console.log(data);
            book.setBooks(data.rows);
            console.log(book.books);
            book.setTotalCount(data.count);
        });
    }, [searchText]);

    useEffect(() => {
        fetchBooks(book.selectedGenre?.id, book.selectedAuthor?.id, book.limit, book.page).then(data => {
            book.setBooks(data.rows);
            book.setTotalCount(data.count);
        });
    }, [book.page, book.selectedGenre, book.selectedAuthor]);

    useEffect(() => {
        fetchBooks(null, null, 8, 1).then(data => {
            book.setBooks(data.rows);
            book.setTotalCount(data.count);
        });
    }, [book.upt]);

    const handleSearch = async () => {
        if (searchText.trim() === '') {
            book.setUpt(true)
        } else {
            // Иначе, загружаем книги, соответствующие поисковому запросу
            const response = await fetchBooks(null, null, 8, 1); // Здесь нужно использовать API для поиска по названию
            const filteredBooks = response.rows.filter(book => book.name.toLowerCase().includes(searchText.toLowerCase()));
            book.setBooks(filteredBooks);
            book.setTotalCount(filteredBooks.length); // Устанавливаем общее количество найденных книг
        }
    };

    return (
        <Container className="admin-container">
            <AddAdm/>
            <hr/>
            <br/>
            <Row className="mt-2 find-line">
                <div className="d-flex align-items-center mb-3">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Поиск по названию книги"
                        value={searchText}
                        onChange={e => {setSearchText(e.target.value)
                        }}
                    />
                    <Button variant="dark" onClick={handleSearch}>
                        Найти
                    </Button>
                </div>
            </Row>
            <hr/>
            <Row className="mt-2">
                <Col md={2}>
                    <AuthorBar/>
                </Col>
                <Col sm={10}>
                    <GenreBar/>
                    <Container className="p-2 ">
                        <AdminBookList/>
                    </Container>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default AdminBooks;