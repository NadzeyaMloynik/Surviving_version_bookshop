import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Contacts = () => {
    return (
        <section className='homepage-section'>
            <Container className='homepage-white border-bottom text-center d-flex justify-contend-center align-items-center flex-column'>
            <Row className='cont-info'>
            <h2 className='mt-5'>Контактная информация</h2>
    <div class="mt-4">
      <p class="text">Приоритетным способом коммуникации с магазином является телефон. Наши сотрудники всегда рады
        ответить на возникшие вопросы. Работает бесплатный для всей Беларуси номер - А1: <a
          href="tel:+375 (29) 113-0123">+375 (29) 113-0123; </a> МТС: <a href="tel:+375297710123">+375 (29)
          771-0123</a>. Звоните!</p>
          </div>
          <hr/>
            </Row>
            
            <Row className='cont-info'>
            <p class="text">Приём заказов и вопросов - круглосуточно.<br/>
        Оператор - Пн-пт: 10:00 - 20:00; Сб-вск: 10:00 - 18:00; <br/>
        Курьер - Пн-пт: 10:00 - 22:00; Сб-вск: 10:00 - 20:00.</p>
      <p class="text">Почта: <a href="mailto:info@yarnhouse.by">info@unibook.by</a></p>
            </Row>
            </Container>
            <br/>
            <Container className='mt-5 homepage-white border-top text-center d-flex justify-contend-center align-items-center flex-column'>
            <h6 class="text mt-4 mb-4">Адрес магазина: Беларусь, Минск, ул. Немига, 3</h6>
      <iframe className='mb-5'
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.5701237158305!2d27.54967441568557!3d53.90384418009958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcfeba0413c91%3A0xe0fb783d2af93747!2z0YPQuy4g0J3QtdC80LjQs9CwIDMsINCc0LjQvdGB0Lo!5e0!3m2!1sru!2sby!4v1670627793907!5m2!1sru!2sby"
        width={1000} height={450} allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
            </Container>
        </section>
    );
};

export default Contacts;