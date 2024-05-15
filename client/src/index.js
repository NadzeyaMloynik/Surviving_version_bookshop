// Используйте импорт из react-dom/client
import { createRoot } from 'react-dom/client';

import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from "./store/UserStore";
import BookStore from "./store/BookStore";
import BasketStore from "./store/BasketStore";

export const Context = createContext(null);

// Используйте createRoot из react-dom/client
const root = createRoot(document.getElementById('root'));

root.render(
    <Context.Provider value={{
        user: new UserStore(),
        book: new BookStore(),
        basket: new BasketStore(),
    }}>
        <App />
    </Context.Provider>
);

reportWebVitals();