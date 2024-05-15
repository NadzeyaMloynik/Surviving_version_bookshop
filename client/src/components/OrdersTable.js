import React, { useContext, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const OrdersTable = observer(() => {
    const { basket } = useContext(Context);
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
                </tr>
                </thead>
                <tbody>
                {basket.boughtBooks.map((book, index) => (
                    <tr key={book.id}>
                        <td>{index + 1}</td>
                        <td style={{ textAlign: 'center' }} className="cell_basket">
                            <Image src={`${process.env.REACT_APP_API_URL}/${book.book.img}`} alt={book.book.name} />
                        </td>
                        <td>{book.book.name}</td>
                        <td>{book.book.price}</td>
                        <td>{book.isDelivered ? 'Да' : 'Нет'}</td>
                        <td>{book.state}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
});

export default OrdersTable;
