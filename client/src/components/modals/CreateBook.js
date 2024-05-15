import React, {useContext, useEffect, useState} from 'react';
import {Button, ButtonGroup, Dropdown, Form, Row} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {Context} from "../../index";
import Col from "react-bootstrap/Col";
import {
    createBook,
    fetchAuthors,
    fetchGenres,
} from "../../http/BookAPI";
import {observer} from "mobx-react-lite";


const CreateBook =observer(({show,onHide}) => {
    const {book} = useContext(Context)
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);

    const [info, setInfo] = useState([]);


    useEffect(() => {
        fetchAuthors().then(data => book.setAuthors(data))
        fetchGenres().then(data => book.setGenres(data))
    }, []);

    const addInfo=()=>{
        setInfo([...info, {title:'',description:'', number:Date.now()}])
    }
    const removeInfo=(number)=>{
        setInfo(info.filter(i=>i.number!==number))
    }

    const selectFile = e =>{
        setFile(e.target.files[0])
    }

    const changeInfo = (key,value,number) =>{
        setInfo(info.map(i=>i.number===number?{...i,[key]:value}:i))
    }

    const clearFolders = () => {
        setName('')
        setPrice('')
        book.setSelectedAuthor(null)
        book.setSelectedGenre(null)
        setInfo([])
    }

    const addBook = () =>{
        try {
            const formData = new FormData();
            if (name)
                formData.append('name', name)
            else return alert("Введите название книги");
            formData.append('price', `${price}`)
            if (file)
                formData.append('img', file)
            else return alert("Добавьте изображение");

            if (book.selectedGenre && book.selectedAuthor) {
                formData.append('authorId', book.selectedGenre.id)
                formData.append('genreId', book.selectedAuthor.id)
            } else return alert("Вы не выбрали автора или жанр");
            formData.append('info', JSON.stringify(info))
            createBook(formData).then(data => {
                book.setUpt(true)
                onHide()
                clearFolders()
                book.setSelectedGenre(null)
                book.setSelectedAuthor(null)
            })

        }
        catch (e) {

        }
    }

    const options = [
        'Описание',
        'Название в оригинале',
        'Издательство',
        'Язык',
        'Год издания',
        'Страниц',
        'Переплет',
        'Вес',
        'Возрастные ограничения',
    ];

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Книга
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>

                    <Dropdown className="dropdownDevice mt-2">
                        <Dropdown.Toggle variant="outline-dark">
                            {book.selectedAuthor?.name ||"Автор"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {book.authors.map(author =>
                            <Dropdown.Item onClick={()=>book.setSelectedAuthor(author)} key={author.id}> {author.name} </Dropdown.Item>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="dropdownDevice mt-2">
                        <Dropdown.Toggle variant="outline-dark">
                            {book.selectedGenre?.name || "Жанр"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {book.genres.map(genre =>
                                <Dropdown.Item onClick={()=>book.setSelectedGenre(genre)} key={genre.id}> {genre.name} </Dropdown.Item>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                         <Form.Control
                             value={name}
                             onChange={e=>setName(e.target.value)}
                             className="mt-2"
                             placeholder="Название книги..."

                         />
                        <Form.Control
                            value={price}
                            onChange={e=>setPrice(Number(e.target.value))}
                            className="mt-2"
                            placeholder="Стоимость книги"
                            type="number"
                            step="0.01"
                            min="0"
                        />
                        <Form.Control
                            className="mt-2"
                            type="file"
                            onChange={selectFile}
                        />
                        <hr/>
                        <Button

                        variant="outline-dark"
                        onClick={addInfo}>
                            Добавить описание
                        </Button>
                        {
                            info.map(i=>
                                <Row key={i.number}>
                                    <Row md={4}>
                                            <Dropdown className="dropdownDevice mt-2">
                                                <Dropdown.Toggle variant="outline-dark">
                                                    {i.title? i.title : "Выберите описание"}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {options.map((option, index) =>
                                                        <Dropdown.Item onClick={(e) => changeInfo('title', option, i.number)} key={index}>{option}</Dropdown.Item>
                                                    )}
                                                </Dropdown.Menu>
                                            </Dropdown>

                                    </Row>
                                    <Col md={4}>
                                    <Form.Control
                                            value={i.title}
                                            onChange={(e) => changeInfo('title',e.target.value, i.number)}
                                            className="mt-2"
                                            placeholder="Название"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Form.Control
                                            value={i.description}
                                            onChange={e=>changeInfo('description', e.target.value,i.number)}
                                            className="mt-2"
                                            placeholder="Описание"
                                        />
                                    </Col>
                                    <Col md={4} >
                                      <Button
                                          className="mt-2"
                                          variant="outline-danger"
                                          onClick={()=>removeInfo(i.number)}>
                                          Удалить</Button>
                                    </Col>
                                </Row>
                            )
                        }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <ButtonGroup>
                    <Button variant="outline-dark" onClick={() => onHide()}>Отмена</Button>
                    <Button variant="dark" onClick={addBook}>Добавить</Button>
                </ButtonGroup>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateBook;