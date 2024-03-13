import React, { useContext } from 'react';
import {Routes,Route} from 'react-router-dom';
import AuthContext from '../context/Context'

import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { ProductForm } from './product/ProductForm';
import { ProductList } from './product/ProductList';
import { OrderForm } from './order/OrderForm';

export function Pages(){
    const {loggedIn} = useContext(AuthContext);
    const {roleAndId} = useContext(AuthContext);

    return (
        <Routes>
            {loggedIn === false &&(
                <>
                    <Route path = "/register" element={<Register/>}/>
                    <Route path = "/login" element = {<Login/>}/>
                </>
            )}
            {loggedIn === true &&(
                <>
                    <Route path = "/create-product" element={<ProductForm/>}/>
                    <Route path = "/update-product/:id" element={<ProductForm/>}/>
                    <Route path="/products/:id" element={<ProductList/>}/>
                    <Route path="/create-order" element={<OrderForm/>}/>
                </>
            )}
        </Routes>
    )
}