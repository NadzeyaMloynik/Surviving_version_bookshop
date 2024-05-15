import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Container} from "react-bootstrap";

const GenreBar =observer( () => {
    const {book} = useContext(Context)

     const click = (genre) => {
        if(book.selectedGenre && book.selectedGenre.id === genre.id){
            book.setSelectedGenre(null)
        }
        else {
            book.setSelectedGenre(genre)
        }
     }
    return (
       <Container className="d-flex" >
            {book.genres.map(genre =>
            <Card
                key={genre.id}
                style={{cursor:'pointer'}}
                onClick={()=> click(genre)}
                border={genre.id === book.selectedGenre?.id?'dark':'light'}

                className = "p-2 genre-bar br-0">

                {genre.name}
            </Card>

           )}


       </Container>

    );
});

export default GenreBar;