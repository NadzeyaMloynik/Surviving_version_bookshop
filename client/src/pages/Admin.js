import React, {useContext, useEffect, useState} from 'react';
import { Container, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { observer } from 'mobx-react-lite';
import MainAdm from '../components/MainAdm';
import AddAdm from '../components/AddAdm';
import OrderAdm from '../components/OrderAdm';
import AdmBar from '../components/AdmBar';
import AdminBooks from "../components/AdminBooks";
import {Context} from "../index";
import {fetchAuthors, fetchBooks, fetchGenres} from "../http/BookAPI";
import OrdersAdmin from "../components/OrdersAdmin";

const Admin = observer(() => {
    const [currentSection, setCurrentSection] = useState('Books');

    const { book } = useContext(Context);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        book.setSelectedAuthor(null);
        book.setSelectedGenre(null);

        fetchAuthors().then(data => book.setAuthors(data));
        fetchGenres().then(data => book.setGenres(data));
        fetchBooks(null, null, 8, 1).then(data => {
            book.setBooks(data.rows);
            book.setTotalCount(data.count);
        });
        book.setUpt(false)
    }, [book.upt]);

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

    const handleSectionChange = (section) => {
        setCurrentSection(section);
    };

    return (
            <Row>
                <Col md={2}>
                    <AdmBar onSectionChange={handleSectionChange} />
                </Col>
                <Col md={10} className="d-flex flex-column align-items-start justify-content-start">
                        {currentSection === 'Books' && <AdminBooks />}
                        {currentSection === 'Orders' && <OrdersAdmin />}
                </Col>
            </Row>
    );
});

export default Admin;
