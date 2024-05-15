import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, ListGroup, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {observer} from "mobx-react-lite";
import InputGroup from 'react-bootstrap/InputGroup';
import {buyBook, fetchAllBaskets, fetchBasket} from "../http/BasketAPI";
import {Context} from "../index";
import BasketTable from "../components/BasketTable";
import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import {fetchBooks} from "../http/BookAPI";
import OrdersTable from "../components/OrdersTable";
import OrdersTableAdmin from "./OrdersTableAdmin";


const OrdersAdmin = observer(() => {

    const {user,basket} = useContext(Context);

    useEffect(() => {
        fetchAllBaskets().then(data => {
            if(isNaN(data)){
                basket.setBooks(data)
            }
            else{
                basket.setBooks([])
            }
        })
        basket.setUpt(false)

    }, [basket.upt]);

    return(
        <Container className="min-height mt-5">
            <Row>
                <Col md={12} >
                    <OrdersTableAdmin/>
                </Col>
                <hr className="mt-5"/>
            </Row>
        </Container>
    );






});

export default OrdersAdmin;