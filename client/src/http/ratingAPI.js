import {$authHost} from "./index";


export const setRating=async (bookId, rate, userId)=>{
    const {data} = await $authHost.post("api/rating", {bookId, rate, userId});
    return data
}