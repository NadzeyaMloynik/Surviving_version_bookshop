import React, {useContext, useState} from 'react';
import {Button, ButtonGroup, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {createAuthor} from "../../http/BookAPI";
import {Context} from "../../index";


const CreateAuthor = ({show,onHide}) => {
    const {book} = useContext(Context)
    const [value, setValue] =useState('');

    const addAuthor = () =>{
        createAuthor({name:value}).then(data=>{
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
                    Автор
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form><Form.Control
                    placeholder="Введите ФИО автора..."
                    value={value}
                    onChange={e=>setValue(e.target.value)}
                />

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <ButtonGroup>
                    <Button variant="outline-dark" onClick={() => onHide()}>Отмена</Button>
                    <Button variant="dark" onClick={addAuthor}>Добавить</Button>
                </ButtonGroup>
            </Modal.Footer>




        </Modal>
    );
};

export default CreateAuthor;