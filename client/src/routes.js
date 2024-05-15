import {
    ADMIN_ROUTE,
    BASKET_ROUTE, BOOK_ROUTE,
    CONTACT_ROUTE,
    DEVICE_ROUTE,
    HOME_ROUTE,
    INFO_ROUTE,
    LOGIN_ROUTE, ORDER_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "./utils/consts";
import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import BookPage from "./pages/BookPage";
import Auth from "./pages/Auth";
import Home from "./pages/HomePage";
import Contacts from "./pages/Contacts";
import ShopInfo from "./pages/ShopInfo";

import React from "react";
import Orders from "./pages/Orders";

export const authRoutes= [
    {
        path: ADMIN_ROUTE,
        element: <Admin />
    },
    {
        path: BASKET_ROUTE,
       element:<Basket/>
    },
    {
        path: ORDER_ROUTE,
        element:<Orders/>
    },
]


export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        element:<Shop/>
    },
    {
      path  : HOME_ROUTE,
        element:<Home/>
    },
    {
        path  : CONTACT_ROUTE,
        element:<Contacts/>
    },
    {
        path: LOGIN_ROUTE,
        element:<Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        element:<Auth/>
    },
    {
        path: BOOK_ROUTE+'/:id',
        element:<BookPage/>
    },
]