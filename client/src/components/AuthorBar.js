import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const AuthorBar =observer( () => {
   const {book} = useContext(Context)


    const click = (author) => {
        if(book.selectedAuthor && book.selectedAuthor.id === author.id){
            book.setSelectedAuthor(null)
        }
        else {
            book.setSelectedAuthor(author)
        }
    }
    return (
        <ListGroup>
            {book.authors.map(author=>
                <ListGroup.Item
                    style={{cursor:'pointer'}}
                    className="author-bar br-0"
                    active = {author.id === book.selectedAuthor?.id}
                    onClick={()=> click(author)}

                    key={author.id}>
                    {author.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default AuthorBar;