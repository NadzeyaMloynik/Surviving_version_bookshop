import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {Button, ButtonGroup, Container, Nav, Navbar,  NavDropdown, Image} from "react-bootstrap";
import { NavLink, useNavigate} from "react-router-dom";
import {
    ADMIN_ROUTE, BASKET_ROUTE,
    CONTACT_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE, ORDER_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "../utils/consts";
import {observer} from "mobx-react-lite";
import logo from "../assets/koi.png"



const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate();

   const logOut=()=>{
       user.setUser({})
       user.setIsAuth(false)
       navigate(HOME_ROUTE )
   }
    return (
        <Navbar bg ="dark" data-bs-theme="dark" collapseOnSelect className="navbar-dark">
            <Container>
                <Navbar.Brand>
                    <NavLink to={HOME_ROUTE} className="nav-link">
                    <h3 className='logo'>
                        UNIBO
                        <Image src={logo}/>
                        K
                    </h3>
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={SHOP_ROUTE} className="nav-link">Каталог</NavLink>
                        {user.user?.role === "ADMIN" ?
                            <NavLink to={ADMIN_ROUTE} className="nav-link">Панель управления</NavLink>
                            :
                            <></>
                        }
                        {
                            user.user?.role === "USER" ?
                                <>
                                    <NavLink to={BASKET_ROUTE} className="nav-link">Корзина</NavLink>
                                    <NavLink to={ORDER_ROUTE} className="nav-link">Заказы</NavLink>
                                </>
                                :
                                <></>
                        }
                        <NavLink to={CONTACT_ROUTE} className="nav-link">Контакты</NavLink>
                    </Nav>
                    <Nav>
                        {user.isAuth ?
                            <Button className="br-0" variant={"outline-light"} onClick={()=> logOut()}>Выйти</Button>
                            :
                            <ButtonGroup>
                                <Button className="br-0" variant={"outline-light"} onClick={()=>navigate(LOGIN_ROUTE)}>Войти</Button>
                                <Button className="br-0" variant={"outline-light"} onClick={()=>navigate(REGISTRATION_ROUTE) }>Регистрация</Button>
                            </ButtonGroup>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;