import React,{useContext} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {HOME_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)
    console.log(user)

    return (

            <Routes>
               {user.isAuth && authRoutes.map(({path,element})=>
                    <Route key = {path} path ={path} element={element} exact/>
                )}

                {publicRoutes.map(({path,element})=>
                    <Route key = {path} path ={path} element={element} exact/>
                )}
                <Route path="*" element={<Navigate to={HOME_ROUTE}/>} exact/>
            </Routes>


    );
};

export default AppRouter;
