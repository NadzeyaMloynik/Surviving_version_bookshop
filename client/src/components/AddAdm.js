import React, {useState} from 'react';
import {Button, Container, Row} from "react-bootstrap";
import CreateGenre from "./modals/CreateGenre";
import CreateBook from "./modals/CreateBook";
import CreateAuthor from "./modals/CreateAuthor";
import {observer} from "mobx-react-lite";

const AddAdm = observer(() => {
    const [deviceVisible, setDeviceVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    return (
        <Container className="d-flex justify-content-between add-buttons mt-3">
         <Button variant="outline-dark" className="br-0"
                    onClick={()=> setTypeVisible(true)}
           >Добавить автора </Button>

           <Button variant="outline-dark" className="br-0"
                 onClick={()=> setBrandVisible(true)}
           >Добавить жанр </Button>
           <Button variant="outline-dark" className="br-0"
                onClick={()=> setDeviceVisible(true)}
           >Добавить книгу</Button>

            <CreateAuthor show={typeVisible} onHide={()=>setTypeVisible(false)}/>
            <CreateGenre show={brandVisible} onHide={()=>setBrandVisible(false) }/>
            <CreateBook show={deviceVisible} onHide={() =>setDeviceVisible(false)}/>
        </Container>
    );
});

export default AddAdm;