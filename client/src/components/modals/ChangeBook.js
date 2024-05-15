import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Dropdown, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../../index';
import Col from 'react-bootstrap/Col';
import {changeBook, createBook, fetchAuthors, fetchGenres, fetchOneBook} from '../../http/BookAPI';
import { observer } from 'mobx-react-lite';

const ChangeBook = observer(({ show, onHide, id, author, genre }) => {
    const { book } = useContext(Context);
    const [oneBook, setOneBook] = useState({info :[]});
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [ch_author, setCh_author] = useState(author);
    const [ch_genre, setCh_genre] = useState(genre);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchAuthors().then(data => book.setAuthors(data));
        fetchGenres().then(data => book.setGenres(data));
        fetchOneBook(id).then(data => {
            setOneBook(data)
            setName(data.name)
            setPrice(data.price)
            setInfo(
                oneBook.info.map(item => ({
                    title: item.title || '',
                    description: item.description || '',
                    number: item.id
                }))
            );
        });
    }, [show]);

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]);
    };

    const removeInfo = number => {
        setInfo(info.filter(item => item.number !== number));
    };

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const changeInfo = (key, value, number) => {
        setInfo(
            info.map(item => (item.number === number ? { ...item, [key]: value } : item))
        );
    };

    const addBook = () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', `${price}`);
            formData.append('img', file);
            formData.append('authorId', ch_author.id);
            formData.append('genreId', ch_genre.id);
            formData.append('info', JSON.stringify(info));
            changeBook(id, formData).then(data => {
                book.setUpt(true);
                onHide();
                book.setSelectedGenre(null);
                book.setSelectedAuthor(null);
            });
        } catch (error) {
            console.error('Ошибка при добавлении книги:', error);
        }
    };

    const options = [
        'Описание',
        'Название в оригинале',
        'Издательство',
        'Язык',
        'Год издания',
        'Страниц',
        'Переплет',
        'Вес',
        'Возрастные ограничения'
    ];

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Книга</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="dropdownDevice mt-2">
                        <Dropdown.Toggle variant="outline-dark">
                            {ch_author.name || 'Автор'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {book.authors.map(author => (
                                <Dropdown.Item
                                    key={author.id}
                                    onClick={() => setCh_author(author)}
                                >
                                    {author.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="dropdownDevice mt-2">
                        <Dropdown.Toggle variant="outline-dark">
                            {ch_genre.name || 'Жанр'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {book.genres.map(genre => (
                                <Dropdown.Item
                                    key={genre.id}
                                    onClick={() => setCh_genre(genre)}
                                >
                                    {genre.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-2"
                        placeholder="Название книги..."
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-2"
                        placeholder="Стоимость книги"
                        type="number"
                        step="0.01"
                        min="0"
                    />
                    <Form.Control className="mt-2" type="file" onChange={selectFile} />
                    <hr />
                    <Button variant="outline-dark" onClick={addInfo}>
                        Добавить описание
                    </Button>
                    {info.map(item => (
                        <Row key={item.number}>
                            <Col md={4}>
                                <Dropdown className="dropdownDevice mt-2">
                                    <Dropdown.Toggle variant="outline-dark">
                                        {item.title ? item.title : 'Выберите описание'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {options.map((option, index) => (
                                            <Dropdown.Item
                                                key={item.number}
                                                onClick={() =>
                                                    changeInfo('title', option, item.number)
                                                }
                                            >
                                                {option}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={item.description}
                                    onChange={e =>
                                        changeInfo('description', e.target.value, item.number)
                                    }
                                    className="mt-2"
                                    placeholder="Описание"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    className="mt-2"
                                    variant="outline-danger"
                                    onClick={() => removeInfo(item.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <ButtonGroup>
                    <Button variant="outline-dark" onClick={onHide}>
                        Отмена
                    </Button>
                    <Button variant="dark" onClick={addBook}>
                        Изменить
                    </Button>
                </ButtonGroup>
            </Modal.Footer>
        </Modal>
    );
});

export default ChangeBook;
