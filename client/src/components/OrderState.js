import React, {useContext} from 'react';
import {Context} from "../index";
import {stateOrder} from "../http/BasketAPI";
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";

const OrderState = ({id,show,onHide}) => {

    const {basket}  = useContext(Context)
    const [state, setState] = React.useState('')

    const changeState=async ()=>{
        try{
            stateOrder(id,state).then(data=>{
                basket.setUpdateTrigger(true)

            })
        }catch(error){
            console.error('Error in order state', error)
        }
    }

    return (
        <Modal>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Order's state
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={state}
                        onChange={(e)=>setState(e.target.value)}
                        placeholder="Enter current state"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={changeState}>Add</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default OrderState;