import React, {useContext} from 'react';
import {Context} from "../index";
import {setRating} from "../http/ratingAPI";
import {FaStar} from "react-icons/fa";

const Rating = ({rating, bookId, userId}) => {
    const {book} = useContext(Context)
    const stars = [1,2,3,4,5];
    const setRate = (rate) => {
        console.log(rate, bookId, userId)
        if(userId)
        {setRating(bookId, rate, userId)
            .then(data=> {
                book.setUpt(true)
            })
                .catch((error)=>{
                    console.error("Error with adding the rating",error);
                    alert("Вы уже выставили рейтинг")
                });

        }
        else {alert("Чтобы выставить рейтинг войдите в аккаунт покупателя")}
    }

    return (
        <>
            {
                stars.map(star => (
                    star<=rating?<FaStar
                        key={star}
                        className="faStar"
                        color="gold"
                        onClick={() => setRate(star)}
                    />
                    :
                        <FaStar
                        className="faStar"
                        key={star}
                        color="gray"
                        onClick={() => setRate(star)}
                        />

                ))

            }

        </>
    );
};

export default Rating;