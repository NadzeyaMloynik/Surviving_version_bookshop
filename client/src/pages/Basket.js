import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, ListGroup, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {observer} from "mobx-react-lite";
import InputGroup from 'react-bootstrap/InputGroup';
import {buyBook, fetchBasket} from "../http/BasketAPI";
import {Context} from "../index";
import BasketTable from "../components/BasketTable";
import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import {fetchBooks} from "../http/BookAPI";


const Basket = observer(() => {

    const [validated, setValidated] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [agreed, setAgreed] = useState(false);
        const {user,basket} = useContext(Context);
        const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        fetchBasket(user.user.id).then(data => {
            if(isNaN(data)){
                basket.setBasketId(data[0].basketId)
                const filteredBooks = data.filter(device => !device.isBought);
                basket.setBooks(filteredBooks)
            }
            else{
                basket.setBasketId(data)
                basket.setBooks([])
            }
        })
        basket.setUpt(false)

    }, [basket.upt]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity() && agreed) {
            setAgreed(true);
        }
    };
    const totPrice = ()=>{
        let sum = 0;
        basket.books.map(data => {
            sum+=data.book.price;
        });
        return sum;
    }

    const buy = () => {
        if (phoneNumber && agreed) {
            let idList = basket.books.map(book => book.id);
            buyBook(idList).then(data => {
                basket.setUpt(true);
            });
        } else {
            // Выводите сообщение об ошибке или предотвращайте покупку
            alert('Введите номер телефона и дайте согласие на обработку данных для покупки.');
        }
    };

return(basket.books?.length>0? (
            <Container className="min-height mt-5">
                <Row>
                    <Col md={3}>
                        <Card claas="form_basket" style={{width: '18rem'}}>
                            <Card.Body className="d-flex flex-column align-items-center">
                                <Card.Title><h2>Итого</h2></Card.Title>
                                <Card.Text>
                                    <h5>{totPrice()}</h5>
                                </Card.Text>
                                <ListGroup.Item  >
                                    <Form noValidate validated={validated} onSubmit={handleSubmit} className="d-flex flex-column align-items-center justify-content-center">
                                        <Row>
                                            <hr/>
                                            <Form.Group controlId="validationCustomUsername">
                                                <Form.Label><h5>Номер телефона</h5></Form.Label>
                                                <InputGroup hasValidation>
                                                    <InputGroup.Text id="inputGroupPrepend">+375</InputGroup.Text>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="(XX) XXX-XX-XX"
                                                        aria-describedby="inputGroupPrepend"
                                                        required
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Пожалуйста, введите номер телефона
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                        </Row>

                                        <Form.Group className="agreement">
                                            <Form.Check
                                                required
                                                className="agree-text mt-2"
                                                label="Соглашаюсь на обработку данных"
                                                feedback="You must agree before submitting."
                                                feedbackType="invalid"
                                                checked={agreed}
                                                onChange={(e) => setAgreed(e.target.checked)}
                                            />
                                        </Form.Group>
                                        <Button
                                            type="submit"
                                            variant="success"
                                            className="mt-2"
                                            onClick={buy}
                                            disabled={!phoneNumber || !agreed} // Отключаем кнопку, если номер телефона не введен или согласие не дано
                                        >
                                            Купить
                                        </Button>
                                    </Form>
                                </ListGroup.Item>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={9} >
                        <BasketTable/>

                    </Col>
                    <hr className="mt-5"/>


                </Row>
            </Container>):(
                <Container className="d-flex text-center min-height justify-content-center ">
                    <p className="mt-4">
                        Корзина пуста, найти книги можно в {' '}
                        <NavLink to={SHOP_ROUTE} className="link-info">каталоге</NavLink>
                    </p>
                </Container>
));






});

export default Basket;