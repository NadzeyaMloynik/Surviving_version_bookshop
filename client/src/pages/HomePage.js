import React from 'react';
import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import {FaFire} from "react-icons/fa";
import {FaCloud} from "react-icons/fa";
import {FaBabyCarriage} from "react-icons/fa";
import {FaArrowCircleUp} from "react-icons/fa";
import bookshop from "../assets/18efce46-7f12-4019-aa7e-0cbbde14c47c.png"
import book1 from "../assets/101070842_0.jpg"
import book2 from "../assets/101272545_0.jpg"
import book3 from "../assets/10538126_0.jpg"
import book4 from "../assets/10866540_0.jpg"
import { SHOP_ROUTE } from '../utils/consts';
import { useNavigate} from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <section className='homepage-section'>
        <Container className='homepage-white border-bottom'>
            <Row>
            <Col md={5} className='p-5'>
                <h3 className='mt-3'>Добро пожаловать в UNIBook!</h3>
                <hr/>
                <br/>
                <p>UNIBook - это рай для заядлых читателей и книголюбов. Наш магазин призван обеспечить вас новейшими изданиями от известных авторов и издателей со всего мира. Мы верим, что книги - это источник комфорта и вдохновения, и стремимся предоставить вам лучший опыт чтения.</p>
                <p>Здесь вы найдете уют для души и разума!</p>
                <Button
                variant='dark'
                className='br-0 mt-3 ml-4'
                onClick={() => navigate(SHOP_ROUTE)}
                >
                Перейти к покупке
                </Button>
            </Col>
            <Col md={7}>
                <Image src={bookshop} className='homepage-main-img'/>
            </Col>
            </Row>
        </Container>
        <br/>
        <Container className='homepage-white mt-5 border-top d-flex flex-column justify-content-center align-items-center text-center p-5'>
            <h3 className='mt-4'>Почему стоит выбрать нас?</h3>
            <p className='mt-4'>В UNIBook мы предлагаем широкий ассортимент книг на любой вкус и предпочтения. От художественной до нехудожественной литературы, от детских книг до самопомощи - у нас найдется что-то для каждого. Мы также обеспечиваем конкурентоспособные цены на наши книги, чтобы вы могли наслаждаться чтением, не беспокоясь о том, что разоритесь.</p>
            <Container className='mt-5 p-5'>
            <Row className='mb-5'>
                <Col md={5}>
                    <Row className='text-start homepdge-books'>
                        <Col md={1} className='d-flex justify-content-center akign-items-center'>
                            <FaFire className='homepage-icon'/>
                        </Col>
                        <Col md={6} className='p-3'>
                        <h5> Бестселлеры </h5>
                        <p className='mt-3'>Наши бестселлеры написаны известными авторами и обещают держать вас в напряжении.</p>
                        </Col>
                        <Col md={5}>
                            <Image src={book2}/>
                        </Col>
                    </Row>
                    <br/>
                    <hr/>
                    <br/>
                    <Row className='text-start homepdge-books'>
                    <Col md={1} className='d-flex justify-content-center akign-items-center'>
                            <FaArrowCircleUp className='homepage-icon'/>
                        </Col>
                    <Col md={6} className='p-3'>
                        <h5>Личностный рост</h5>
                        <p className='mt-3'>Наши книги по самосовершенствованию призваны помочь вам в достижении ваших личных целей и развитии.</p>
                        </Col>
                        <Col md={5}>
                            <Image src={book3}/>
                        </Col>
                    </Row>
                </Col>
                <Col md={2}></Col>
                <Col md={5}>
                    <Row className='text-start homepdge-books'>
                        <Col md={1} className='d-flex justify-content-center akign-items-center'>
                            <FaBabyCarriage className='homepage-icon'/>
                        </Col>
                        <Col md={6} className='p-3'>
                        <h5>Детские рассказы</h5>
                        <p className='mt-3'>Наши классические детские сборники рассказов - это нестареющие сказки, которые будут бережно храниться вашими малышами долгие годы.</p>
                        </Col>
                        <Col md={5}>
                            <Image src={book4}/>
                        </Col>
                    </Row>
                    <br/>
                    <hr/>
                    <br/>
                    <Row className='text-start homepdge-books'>
                        <Col md={1} className='d-flex justify-content-center akign-items-center'>
                            <FaCloud className='homepage-icon'/>
                        </Col>
                    <Col md={6} className='p-3'>
                        <h5>Разные языки</h5>
                        <p className='mt-3'>Мы предлагаем книги на самых разных языках для вашего комфорта и развития. От художественной до научной литературы.</p>
                        </Col>
                        <Col md={5}>
                            <Image src={book1}/>
                        </Col>
                    </Row>
                </Col>
                </Row>
                <br/><br/>
                <hr/>
            </Container>
        </Container>
        </section>
    );
};

export default HomePage;