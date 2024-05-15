import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const MainAdm = observer(() => {
    const {basket} = useContext(Context)
    const incomeDate = [];
    const countIncomeDate = ( ) => {
        basket.boughtDevices.forEach(data=>{
            const temp = {
                date: data.createdAt,
                income: data.device.price

            }
            incomeDate.push(temp)
        })
    };

    useEffect(()=>{
        countIncomeDate()


    },[]);

    return (
        <div>

        </div>
    );
});

export default MainAdm;