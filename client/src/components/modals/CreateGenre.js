import React, {useContext, useState} from 'react';
import {Button, ButtonGroup, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {createGenre} from "../../http/BookAPI";
import { Context } from '../..';
const CreateGenre = ({show,onHide}) => {
    const {book} = useContext(Context)
    const [value, setValue] =useState('');

    const addBrand = () =>{
        createGenre({name:value}).then(data=>{
            setValue('')
            book.setUpt(true)
            onHide()
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Жанр
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form><Form.Control
                    value={value}
                    onChange={e=>setValue(e.target.value)}
                    placeholder="Введите название жанра..."
                />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <ButtonGroup>
                    <Button variant="outline-dark" onClick={() => onHide()}>Отмена</Button>
                    <Button variant="dark" onClick={addBrand}>Добавить</Button>
                </ButtonGroup>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateGenre;