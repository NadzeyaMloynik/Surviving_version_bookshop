import {Container, Nav} from "react-bootstrap";
import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaVk } from "react-icons/fa";
import {NavLink} from "react-router-dom";
import {CONTACT_ROUTE, HOME_ROUTE, SHOP_ROUTE} from "../utils/consts";

const Footer = () => {
    return (
        <MDBFooter bg="dark" expand="md" data-bs-theme = "dark" className='navbar-dark text-center' color='white' bgColor='dark'>
            <MDBContainer className='p-4'>
                <section className='mb-4'>
                    <NavLink to={"https://www.instagram.com/"}>
                        <FaInstagram className="footer-pic m-2" />
                    </NavLink>
                    <NavLink to={""}>
                        <FaVk className="footer-pic m-2"/>
                    </NavLink>
                    <NavLink to={""}>
                        <FaYoutube className="footer-pic m-2"/>
                    </NavLink>
                    <NavLink to={""}>
                        <FaTiktok className="footer-pic m-2"/>
                    </NavLink>
                </section>

                <section className=''>
                    <MDBRow className='d-flex justify-content-center align-items-start'>
                        <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                            <h5 className='text-uppercase'>UNIBook</h5>
                            <ul className='list-unstyled mb-0'>
                                <li>
                                    <NavLink className="light-link " to={HOME_ROUTE}>Главная</NavLink>
                                </li>
                                <li>
                                    <NavLink className="light-link" to={SHOP_ROUTE}>Каталог</NavLink>
                                </li>
                                <li>
                                    <NavLink className="light-link" to={CONTACT_ROUTE}>Контакты</NavLink>
                                </li>
                            </ul>
                        </MDBCol>

                        <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                            <h5>Адрес</h5>

                            <ul className='list-unstyled mb-0 light-text'>
                                <li>
                                    г. Минск, ул. Немига, 3
                                </li>
                            </ul>
                        </MDBCol>

                        <MDBCol lg='3' md='6' className=' mb-4 mb-md-0'>
                            <h5 className='text-uppercase'>Время работы</h5>

                            <ul className='light-text list-unstyled mb-0'>
                                <li>Оператор:</li>
                                <li>Пн-пт, 10:00 - 20:00</li>
                                <li>Сб-вс 10:00 - 18:00</li>
                                <li>Курьер:</li>
                                <li>Пн-пт, 10:00 - 22:00</li>
                                <li>Сб-вс 10:00 - 22:00</li>
                            </ul>
                        </MDBCol>
                    </MDBRow>
                </section>
            </MDBContainer>
        </MDBFooter>
    )
};


export default Footer;