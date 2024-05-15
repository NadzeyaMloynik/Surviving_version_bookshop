import React, { useContext, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Form } from 'react-bootstrap'; // Добавлен импорт Form
import { confirmOrder, stateOrder } from "../http/BasketAPI";
const OrdersTableAdmin = observer(() => {
    const { basket } = useContext(Context);
    const [showConfirmStateModal, setShowConfirmStateModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [newOrderState, setNewOrderState] = useState('');

    const normal_date = (date) => {
        const norm_date = date.substring(0, 10).split('-');
        return norm_date[2] + '.' + norm_date[1] + '.' + norm_date[0];
    };

    const confirm = (id) => {
        confirmOrder(id).then(data => {
            basket.setUpt(true);
        });
    };

    const handleShowConfirmModal = (id) => {
        setSelectedOrderId(id);
        setShowConfirmModal(true);
    };

    const handleShowConfirmStateModal = (id) => {
        setSelectedOrderId(id);
        setShowConfirmStateModal(true);
    };

    const changeState = (id, state) => {
        stateOrder(id, state).then(data => {
            basket.setUpt(true);
        });
    };

    // Сортировка заказов перед отображением
    const sortedBooks = basket.books.slice().sort((a, b) => {
        // Сначала не доставленные заказы, затем доставленные
        if (a.isDelivered && !b.isDelivered) return 1;
        if (!a.isDelivered && b.isDelivered) return -1;
        // Если оба заказа не доставлены или оба доставлены, сортируем по дате создания
        return new Date(a.createdAt) - new Date(b.createdAt);
    });

    return (
        <div className="text-center">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>№</th>
                    <th></th>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Доставлен</th>
                    <th>Статус доставки</th>
                    <th>Дата заказа</th>
                </tr>
                </thead>
                <tbody>
                {sortedBooks.map((book, index) => (
                    <tr key={book.id}>
                        <td>{index + 1}</td>
                        <td style={{ textAlign: 'center' }} className="cell_basket">
                            <Image src={`${process.env.REACT_APP_API_URL}/${book.book.img}`} alt={book.book.name} />
                        </td>
                        <td>{book.book.name}</td>
                        <td>{book.book.price}</td>
                        <td>
                            {book.isDelivered ? 'Да' : 'Нет'}
                            <hr />
                            <Button
                                onClick={() => handleShowConfirmModal(book.id)}
                                variant="outline-dark"
                            >
                                Подтвердить
                            </Button>
                        </td>
                        <td>
                            {book.state}
                            <hr />
                            <Button
                                variant="outline-dark"
                                onClick={() => handleShowConfirmStateModal(book.id)}
                            >
                                Изменить
                            </Button>
                        </td>
                        <td>
                            {normal_date(book.createdAt)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
             <Modal show={showConfirmStateModal} onHide={() => setShowConfirmStateModal(false)}>
                 <Modal.Header closeButton>
                     <Modal.Title>Подтвердите изменение состояния</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                     <p>Введите новое состояние доставки:</p>
                     <Form.Control
                         type="text"
                         value={newOrderState}
                         onChange={(e) => setNewOrderState(e.target.value)}
                     />
                 </Modal.Body>
                 <Modal.Footer>
                     <Button variant="secondary" onClick={() => setShowConfirmStateModal(false)}>
                         Отмена
                     </Button>
                     <Button variant="primary" onClick={() => {
                         changeState(selectedOrderId, newOrderState);
                         setShowConfirmStateModal(false);
                         setNewOrderState(''); // Очистить значение после закрытия модального окна
                     }}>
                         Подтвердить
                     </Button>
                 </Modal.Footer>
            </Modal>

             <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                 <Modal.Header closeButton>
                     <Modal.Title>Подтвердите изменение состояния</Modal.Title>
                 </Modal.Header>
                 <Modal.Footer>
                     <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                         Отмена
                     </Button>
                     <Button variant="primary" onClick={() => {
                         confirm(selectedOrderId);
                         setShowConfirmModal(false);
                     }}>
                         Подтвердить
                     </Button>
                 </Modal.Footer>
             </Modal>
        </div>
    );
});

export default OrdersTableAdmin;

// const OrdersTableAdmin = observer(() => {
//     const { basket } = useContext(Context);
//     const [showConfirmStateModal, setShowConfirmStateModal] = useState(false);
//     const [showConfirmModal, setShowConfirmModal] = useState(false);
//     const [selectedOrderId, setSelectedOrderId] = useState(null);
//     const [newOrderState, setNewOrderState] = useState('');

//     const normal_date = (date) => {
//             const norm_date =  date.substring(0, 10).split('-')
//             return norm_date[2]+'.'+norm_date[1]+'.'+norm_date[0]
//     }

//     const confirm = (id) => {
//         confirmOrder(id).then(data=>{
//             basket.setUpt(true)
//         });
//     };
//     const handleShowConfirmModal = (id) => {
//         setSelectedOrderId(id);
//         setShowConfirmModal(true);
//     };

//     const handleShowConfirmStateModal = (id) => {
//         setSelectedOrderId(id);
//         setShowConfirmStateModal(true);
//     };

//     const changeState = (id, state) => {
//         stateOrder(id, state).then(data => {
//             basket.setUpt(true);
//         });
//     };

//     return (
//         <div className="text-center">
//             <Table striped bordered hover>
//                 <thead>
//                 <tr>
//                     <th>№</th>
//                     <th></th>
//                     <th>Название</th>
//                     <th>Цена</th>
//                     <th>Доставлен</th>
//                     <th>Статус доставки</th>
//                     <th>Дата заказа</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {basket.books.map((book, index) => (
//                     <tr key={book.id}>
//                         <td>{index + 1}</td>
//                         <td style={{ textAlign: 'center' }} className="cell_basket">
//                             <Image src={`${process.env.REACT_APP_API_URL}/${book.book.img}`} alt={book.book.name} />
//                         </td>
//                         <td>{book.book.name}</td>
//                         <td>{book.book.price}</td>
//                         <td>
//                             {book.isDelivered ? 'Да' : 'Нет'}
//                             <hr/>
//                             <Button
//                                 onClick={() => handleShowConfirmModal(book.id)}
//                                 variant="outline-dark"
//                             >
//                                 Подтвердить
//                             </Button>
//                         </td>
//                         <td>
//                             {book.state}
//                             <hr/>
//                             <Button
//                                 variant="outline-dark"
//                                 onClick={() => handleShowConfirmStateModal(book.id)}
//                             >
//                                 Изменить
//                             </Button>
//                         </td>
//                         <td>
//                             {normal_date(book.createdAt)}
//                         </td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </Table>
//             <Modal show={showConfirmStateModal} onHide={() => setShowConfirmStateModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Подтвердите изменение состояния</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <p>Введите новое состояние доставки:</p>
//                     <Form.Control
//                         type="text"
//                         value={newOrderState}
//                         onChange={(e) => setNewOrderState(e.target.value)}
//                     />
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowConfirmStateModal(false)}>
//                         Отмена
//                     </Button>
//                     <Button variant="primary" onClick={() => {
//                         changeState(selectedOrderId, newOrderState);
//                         setShowConfirmStateModal(false);
//                         setNewOrderState(''); // Очистить значение после закрытия модального окна
//                     }}>
//                         Подтвердить
//                     </Button>
//                 </Modal.Footer>
//             </Modal>

//             <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Подтвердите изменение состояния</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowConfirmStateModal(false)}>
//                         Отмена
//                     </Button>
//                     <Button variant="primary" onClick={() => {
//                         confirm(selectedOrderId);
//                         setShowConfirmModal(false);
//                     }}>
//                         Подтвердить
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// });

// export default OrdersTableAdmin;
