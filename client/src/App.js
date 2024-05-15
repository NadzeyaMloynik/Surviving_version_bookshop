import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";


import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import {check} from "./http/userAPI";
import Footer from "./components/Footer";
import {fetchBasket} from "./http/BasketAPI";

const App = observer(()=> {
  const {user} = useContext(Context)
    const {basket} = useContext(Context)
  const [loading, setLoading]= useState(true);


    useEffect(()=>{
        setTimeout(() => {
            const token = localStorage.getItem('token');
            if (token) {
                check()
                    .then(data => {
                        user.setUser(data);
                        user.setIsAuth(true);
                        if(user.user.role === "USER")
                        fetchBasket(user.user.id).then(data => {
                            if (isNaN(data)) {
                                basket.setBasketId(data[0].basketId)
                                basket.setBoughtBooks(data.filter(device => device.isBought))
                                basket.setBooks(data.filter(device => !device.isBought))
                            } else {
                                basket.setBasketId(data)
                                basket.setBooks([])
                            }
                        })
                    })
                    .catch(error => {
                        console.error('Unauthorized', error.message);
                        user.setIsAuth(false);
                    })
                    .finally(() => setLoading(false));
            } else {
                setLoading(false);
            }
        }, 1000)
    })
    if (loading) {
        return <Spinner animation={"grow"}/>;
    }

    return (
        <div>
            <BrowserRouter>
                <NavBar/>
                <AppRouter/>
                <Footer/>
            </BrowserRouter>
        </div>
    );
})

export default App;


