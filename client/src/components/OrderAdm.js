import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchAllBaskets} from "../http/BasketAPI";
import {Container} from "react-bootstrap";
import OrdersTable from "./OrdersTable";
import OrdersTableAdmin from "./OrdersTableAdmin";

const OrderAdm = observer(() => {

    const {basket} = React.useContext(Context);

    useEffect(() => {
        fetchAllBaskets().then(data=>{
            basket.setBooks(data)

        })
        basket.setUpt(false)
    }, [basket.upt]);

    return (
        <Container>
            <OrdersTableAdmin/>
        </Container>
    );
});

export default OrderAdm;