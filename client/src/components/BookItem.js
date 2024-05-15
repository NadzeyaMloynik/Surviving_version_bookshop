import React, {useContext} from 'react';
import Col from "react-bootstrap/Col";
import {Card, Image, ListGroupItem, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import {BOOK_ROUTE} from "../utils/consts";
import {FaStar} from "react-icons/fa";
import {Context} from "../index";
const DeviceItem = ({oneBook, author, genre}) => {
    const navigate = useNavigate()
    const {book} = useContext(Context)

    return (
       <Col md={3} sm={6} className="mt-3" onClick={()=> {
           navigate(BOOK_ROUTE + '/' + oneBook.id)
           book.setSelectedAuthor(author)
           book.setSelectedGenre(genre)

       }}>
           <Card className="book-item br-0 d-flex flex-column justify-content-between p-2">
               <div  className="d-flex flex-column justify-content-center align-items-center">
                   <Image src={process.env.REACT_APP_API_URL + "/" + oneBook.img} alt="device" />
               </div>
               <div className="d-flex flex-column justify-content-start text-14">
                   {oneBook.name}
                   <div className="text-black-50 mt-1 d-flex justify-content-between">
                       <div className="smText">
                           {author.name}, {genre.name}
                       </div>
                       <div className="smText d-flex align-items-center">
                           {oneBook.rating}
                           <FaStar className="orange"/>
                       </div>
                   </div>
               </div>
           </Card>
       </Col>
    );
};
export default DeviceItem;