import {$authHost, $host} from "./index";

export const fetchAllBaskets = async () => {
    const {data} = await $authHost.get("api/basket/all");
    return data
}
export const fetchBasket = async (userId) => {
    const {data} = await $authHost.get("api/basket", {params:{userId}});
    return data
}
export const addBasketBook = async (basketId, bookId) => {
    const {data} = await $authHost.post("api/basket", {basketId, bookId});
    return data
}
export const removeBasketBook = async (id) => {
    const {data} = await $authHost.delete("api/basket/" + id);
    return data
}

export const buyBook = async (idList) => {
    const {data} = await $authHost.post("api/basket/buy",{idList});
    return data
}

export const confirmOrder = async (id) => {
    const {data} = await $authHost.post("api/basket/confirm",{id});
    return data
}
export const stateOrder = async (id, state) => {
    const {data} = await $authHost.post("api/basket/state",{id, state});
    return data
}
