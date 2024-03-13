import React, {useEffect,useState} from "react";
import {Link,useParams} from 'react-router-dom';

import AxiosInstance from '../../util/Axios';

import { IProduct } from "../../interfaces/product.interface";
import {IOrder} from '../../interfaces/order.interface'

export function OrderList() {
    const [orders,setOrders] = useState([]);
    const {id} = useParams()

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await AxiosInstance.get('/orders',{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}});
                const o = res.data
                if(id){
                    const sellerOrders = o.filter((order:IProduct) => o.buyerId == id || o.restaurantId == id);
                    setOrders(sellerOrders)
                } else {
                    setOrders(o)
                }
            } catch (err:any) {
                console.log(err)
            }
        }
        getOrders();
    },[])


    return(
        <div className="max-w-[85rem] w-[95%] my-8 mx-auto">
                {orders.map((order:IOrder) => {
                    return(
                        <div key = {order._id} className="mb-10 py-5 flex flex-col items-center bg-gray-800 border border-gray-700 rounded-lg shadow md:flex-row md:max-w-xl">
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <>
                                    <h5 className="text-left mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
                                </>
                                <p className="text-left mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
                                <div className="flow-root">
                                    <p className="float-left mt-1 font-bold text-xl text-yellow-550">{order.totalAmount}</p>
                                </div>
                            </div>
                        </div>

                    )
                })}            
        </div>
    )
}