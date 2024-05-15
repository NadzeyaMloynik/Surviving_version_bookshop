import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { FaStar } from "react-icons/fa";
import {FaCartPlus} from "react-icons/fa";

import {useNavigate, useParams} from "react-router-dom";
import {fetchAuthors, fetchGenres, fetchOneBook} from "../http/BookAPI";
import {observer} from "mobx-react-lite";
import {addBasketBook} from "../http/BasketAPI";
import {Context} from "../index";
import Rating from "../components/Rating";
import Modal from "react-bootstrap/Modal";
import { LOGIN_ROUTE } from '../utils/consts';



const BookPage = observer( () => {
    const {user, book} = useContext(Context)
    const {basket} = useContext(Context)
    const [showModal, setShowModal] = useState(false);
    const stars = [];
        const [oneBook, setOneBook] = useState({info :[]});
        const [author, setAuthor] = useState('');
        const [genre, setGenre] = useState('')
        const {id} = useParams()
    const navigate = useNavigate()

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    useEffect(() => {
        fetchGenres().then(data => book.setGenres(data))
        fetchAuthors().then(data => book.setAuthors(data))
        fetchGenres().then(data => book.setGenres(data))
            fetchAuthors().then(data => book.setAuthors(data))
            fetchOneBook(id).then(data => {
                setOneBook(data);
                const authorInfo = book.authors.find(item => item.id === data.authorId);
                const genreInfo = book.genres.find(item => item.id === data.genreId);
                setAuthor(authorInfo || '');
                setGenre(genreInfo || '');
            })
        book.setUpt(false)
    }, [book.upt]);

    /*const addToCart = ()=>{
        console.log(id)
        console.log(basket.basketId)
        addBasketBook(basket.basketId, id).then(data => console.log(data))
    }*/
    const addToCart = () => {
        console.log(user.user)
        if(user.user.role === "ADMIN")
            return alert("Войдите с аккаунта пользователя")
        else if(user.user.role !== "USER")
            {
                alert("Войдите в аккаунт")
                return navigate(LOGIN_ROUTE)
            }
        openModal();
    };

    const description = oneBook.info?.find(item=>item.title === "Описание")
    const year = oneBook.info?.find(item=>item.title === "Год издания")



    for (let i = 0; i < 5; i++) {
        if (i < oneBook.rating) {
            stars.push(<FaStar key={i} color="#ff8753" />);
        } else {
            stars.push(<FaStar key={i} color="gray" />);
        }
    }

    return (
       <Container className="book-page">
           <Row className="mt-2">
               <Col md={5}>
                   <Image src={process.env.REACT_APP_API_URL + "/" + oneBook.img} />
               </Col>
               <Col md={7} className="mt-1 d-flex flex-column justify-content-start align-items-start text-sm">
                   <Row>
                       <h2 className="mt-4">{oneBook.name}</h2>
                       <div className="d-flex">
                           {author ? author.name + ", " : "Автор не известен, "}
                           {genre ? genre.name.toLowerCase() + ", " : "Жанр не известен, "}
                           {year ? year.description : "год издания не известен"}
                       </div>
                       <div className='d-flex justify-content-start align-items-center'>
                           <div className="mr-2">
                               <Rating
                                   rating={oneBook.rating}
                                   bookId= {id}
                                   userId = {user.user.id}
                               />
                           </div>
                           <div className="mt-1">{oneBook.rating}</div>
                       </div>
                       <hr className="mt-3" />
                   </Row>
                   <Row>
                       <Container className=" ml-2 d-flex justify-content-start align-items-center">
                           <h4 className="sale"><s><strong>{(oneBook.price * 1.15).toFixed(2)}р.</strong></s></h4>
                           <h3 className="orange"><strong>{oneBook.price}р.</strong></h3>
                       </Container>
                       <Container className="d-flex justify-content-start align-items-center">
                           <p className="lable-sale">Вы сэкономили: {(oneBook.price * 0.15).toFixed(2)}</p>
                           <p className="lable-sale-text">Ваша скидка 15%</p>
                       </Container>
                   </Row>
                   <Button
                       className="mt-3 buy-button"
                       onClick={addToCart}
                   >
                       <FaCartPlus className="cart-icon" />
                       Добавить в корзину</Button>
                   <Container className="mt-4">
                      <p className="book-description"> {description ? description.description : "Описание товара отсутствует"}</p>
                   </Container>
               </Col>
           </Row>
           <hr/>
           <Row>
               <h5 className="h-description">Описание товара</h5>
               <Row className="mb-3 d-flex justify-content-end align-items-center text-description">
                   {oneBook.info
                       ? oneBook.info.map((item, index) => {
                           if (item.title !== "Описание") {
                               return (
                                   <>
                                       <Col md={3} key={index+"t"} className="d-flex justify-content-start align-items-start">
                                           {item.title}
                                       </Col>
                                       <Col md={9} key={index} sm={6}>
                                       {item.description}
                                   </Col>
                                   </>
                               );
                           }
                           return null;
                       })
                       : null}
               </Row>
           </Row>
           <Modal show={showModal} onHide={closeModal}>
               <Modal.Header closeButton>
                   <Modal.Title>Добавление товара в корзину</Modal.Title>
               </Modal.Header>
               <Modal.Body>Вы уверены, что хотите добавить этот товар в корзину?</Modal.Body>
               <Modal.Footer>
                   <Button variant="secondary" onClick={closeModal}>
                       Отмена
                   </Button>
                   <Button variant="primary" onClick={() => {
                       addBasketBook(basket.basketId, id).then(data => {
                           console.log(data);
                           closeModal(); // Закрыть модальное окно после добавления
                       });
                   }}>
                       Да, добавить в корзину
                   </Button>
               </Modal.Footer>
           </Modal>
       </Container>
    );
});

export default BookPage;