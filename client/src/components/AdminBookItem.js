import React, { useContext, useState } from 'react';
import { Col, Card, Image, Modal, Button } from 'react-bootstrap';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Context } from '../index';
import { deleteBook } from '../http/BookAPI';
import CreateAuthor from "./modals/CreateAuthor";
import ChangeBook from "./modals/ChangeBook";

const AdminBookItem = ({ oneBook, author, genre }) => {
    const { book } = useContext(Context);
    const [changeVisible, setChangeVisible] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleDeleteBook = async () => {
        try {
            await deleteBook(oneBook.id);
            book.setUpt(true);
            handleCloseModal();
        } catch (error) {
            console.error('Ошибка при удалении книги:', error);
        }
    };

    const handleCloseModal = () => {
        setShowConfirmModal(false);
    };

    const handleShowModal = () => {
        setShowConfirmModal(true);
    };

    return (
        <Col md={3} sm={6} className="mt-3">
            <Card className="book-item-admin br-0 d-flex flex-column justify-content-between p-2">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Image src={process.env.REACT_APP_API_URL + '/' + oneBook.img} alt="device" />
                </div>
                <div className="d-flex flex-column justify-content-start text-14">{oneBook.name}</div>
                <hr />
                <div className="d-flex justify-content-between">
                    <FaPen className="pen" onClick={() => setChangeVisible(true)} />
                    <FaTrash className="trash" onClick={handleShowModal} />
                </div>
            </Card>

            <Modal show={showConfirmModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Подтвердите удаление</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы уверены, что хотите удалить книгу "{oneBook.name}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Отмена
                    </Button>
                    <Button variant="danger" onClick={handleDeleteBook}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>

            <ChangeBook
                show={changeVisible}
                onHide={()=>setChangeVisible(false)}
                id={oneBook.id}
                author={author}
                genre={genre}
            />
        </Col>
    );
};

export default AdminBookItem;
