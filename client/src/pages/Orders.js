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
import OrdersTable from "../components/OrdersTable";


const Orders = observer(() => {

    const {user,basket} = useContext(Context);

    useEffect(() => {
        fetchBasket(user.user.id).then(data => {
            if(isNaN(data)){
                basket.setBasketId(data[0].basketId)
                const filteredBooks = data.filter(device => device.isBought);
                console.log(filteredBooks);
                basket.setBoughtBooks(filteredBooks)
            }
            else{
                basket.setBasketId(data)
                basket.setBoughtBooks([])
            }
        })
        basket.setUpt(false)

    }, [basket.upt]);

    return(basket.boughtBooks?.length>0? (
        <Container className="min-height mt-5">
            <Row>
                <Col md={12} >
                    <OrdersTable/>
                </Col>
                <hr className="mt-5"/>
            </Row>
        </Container>):(
        <Container className="d-flex text-center min-height justify-content-center ">
            <p className="mt-4">
                Вы ничего не заказали, перейдите в {' '}
                <NavLink to={SHOP_ROUTE} className="link-info">каталог</NavLink>
            </p>
        </Container>
    ));






});

export default Orders;