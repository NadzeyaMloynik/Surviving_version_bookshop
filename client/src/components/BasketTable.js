import React, { useContext, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import { FaTrash } from 'react-icons/fa';
import { Context } from '../index';
import { removeBasketBook } from '../http/BasketAPI';
import { observer } from 'mobx-react-lite';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const BasketTable = observer(() => {
    const { basket } = useContext(Context);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const removeFromCart = async (id) => {
        removeBasketBook(id).then((data) => {
            console.log(data);
            basket.setUpt(true);
            setSelectedBookId(null); // Сбрасываем выбранный элемент после удаления
        });
    };

    const handleDeleteConfirmation = (id) => {
        setSelectedBookId(id);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        if (selectedBookId) {
            removeFromCart(selectedBookId);
            setShowConfirmModal(false);
        }
    };

    const handleCloseModal = () => {
        setShowConfirmModal(false);
        setSelectedBookId(null);
    };

    return (
        <div className="text-center">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>№</th>
                    <th></th>
                    <th>Название</th>
                    <th>Цена</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {basket.books.map((book, index) => (
                    <tr key={book.id}>
                        <td>{index + 1}</td>
                        <td style={{ textAlign: 'center' }} className="cell_basket">
                            <Image src={`${process.env.REACT_APP_API_URL}/${book.book.img}`} alt={book.book.name} />
                        </td>
                        <td>{book.book.name}</td>
                        <td>{book.book.price}</td>
                        <td onClick={() => handleDeleteConfirmation(book.id)}>
                            <FaTrash className="trash" />
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Модальное окно подтверждения удаления */}
            <Modal show={showConfirmModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Подтвердите удаление</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы уверены, что хотите удалить этот элемент из корзины?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Отмена
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default BasketTable;
