import React, {useState,useContext,useEffect} from "react";
import {useParams} from "react-router-dom";

import AxiosInstance from '../../util/Axios';
import AuthContext from "../../context/Context";

import { IOrder } from "../../interfaces/order.interface";
import { IProduct } from "../../interfaces/product.interface";
import { CartProduct } from "../../interfaces/cart.product.interface";

export function OrderForm(){
    const [order,setOrder] = useState({
        "city":'',
        "street":'',
        "resNum":'',
        "apartment":false,
        "zip":'',
        "paymentType":'',
        "nameOnCard":'',
        "expiration":'',
        "cvv":'',
        "creditNumber":''
    });

    const [cart,setCart] = useState({
        "cartInfo":[{
            "productInfo":{
                "_id":'',
                "name":'',
                "description":'',
                "price":0,
                "image":'',
                "creatorId":''
            },
            "quantity":0
        }],
        "totalPrice":''
    })

    useEffect(() => {
        const getCart = async () => {
            await AxiosInstance.get(`/cart`,{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}}).then((results) => {
                setCart(results.data)
            }).catch(err => {
                console.log(err);
            });
        }
        getCart();
    },[])

    const reduceQuantity = async (id:any) => {
        await AxiosInstance.post(`/reducecart/${id}`,{},{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}}).then((results) => {
            console.log(results)
        }).catch(err => {
            console.log(err);
        });
    }

    const increaseQuantity = async (productId:any) => {
        await AxiosInstance.post("/addtocart",{"productId":productId},{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}}).then((results) => {
            console.log(results)
        }).catch(err => {
            console.log(err);
        });
    }

    const createOrder = async () => {
        await AxiosInstance.post("/create-order",order,{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}}).then((response) => {
            console.log(response)
            window.location.href = `/`
        }).catch(err => {
            console.log(err)
        })
    }

    console.log(cart.cartInfo)

    return(
        <div className="container p-12 mx-auto">
            <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
                <div className="flex flex-col md:w-full">
                    <h2 className="mb-4 font-bold md:text-2xl text-heading ">Order information</h2>
                    <form className="justify-center w-full mx-auto" onSubmit={async () => await createOrder()}>
                        <div className="">
                            <h4 className="mb-4 font-medium md:text-xl">Address information</h4>
                            <div className="space-x-0 lg:flex lg:space-x-4">
                                <div className="w-full lg:w-1/3">
                                    <label htmlFor="city" className="block mb-3 text-sm font-semibold text-gray-500">City</label>
                                    <input value={order.city} onChange = {(e) => setOrder({...order,city:e.target.value})} name="city" type="text" placeholder="City" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                                </div>
                                <div className="w-full lg:w-1/3 ">
                                    <label htmlFor="street" className="block mb-3 text-sm font-semibold text-gray-500">Street</label>
                                    <input value={order.street} onChange = {(e) => setOrder({...order,street:e.target.value})} name="street" type="text" placeholder="Street" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                                </div>
                                <div className="w-full lg:w-1/3 ">
                                    <label htmlFor="zip" className="block mb-3 text-sm font-semibold text-gray-500">Zip</label>
                                    <input value={order.zip} onChange = {(e) => setOrder({...order,zip:e.target.value})} name="zip" type="number" placeholder="Zip" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                                </div>
                            </div>
                            <div className="mt-4 space-x-0 lg:flex lg:space-x-4">
                                <div className="w-full lg:w-1/2">
                                    <label htmlFor="resNum" className="block mb-3 text-sm font-semibold text-gray-500">Residence number</label>
                                    <input name="resNum" type="number" value={order.resNum} onChange = {(e) => setOrder({...order,resNum:e.target.value})} placeholder="Residence number" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                                </div>
                                <div className="w-full lg:w-1/2 flex items-center mt-7">
                                    <input name="apartment" type={"radio"} id={"true"} value = {"true"} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked = {order.apartment === true} onChange={(e) => setOrder({...order,apartment:Boolean(e.target.value)})}/>
                                    <label htmlFor = "apartment" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Apartment</label>
                                    <input name="other" type={"radio"} id={"false"} value ={"false"} className="w-4 h-4 ml-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked = {order.apartment === false} onChange={(e) => setOrder({...order,apartment:Boolean(e.target.value)})}/>
                                    <label htmlFor = "other" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Other</label>
                                </div>
                            </div>
                            <h4 className="mb-4 mt-4 font-medium md:text-xl">Payment information</h4>
                            <div className="space-x-0 lg:flex lg:space-x-4">
                                <div className="w-full lg:w-1/2">
                                    <label htmlFor="paymentType" className="block mb-3 text-sm font-semibold text-gray-500">Payment type</label>
                                    <select value = {order.paymentType} onChange={(e) => setOrder({...order,paymentType:e.target.value})} id="paymentType" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600">
                                        <option>Choose a payment type</option>
                                        <option value={"Cash"}>Cash</option>
                                        <option value={"Debit"}>Debit</option>
                                        <option value={"Credit"}>Credit</option>
                                    </select>
                                </div>
                                {order.paymentType === "Credit" &&(
                                    <div className="w-full lg:w-1/2">
                                        <label htmlFor="nameOnCard" className="block mb-3 text-sm font-semibold text-gray-500">Name on card</label>
                                        <input value={order.nameOnCard} onChange = {(e) => setOrder({...order,nameOnCard:e.target.value})} name="nameOnCard" type="text" placeholder="Name on card" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                                    </div>
                                )}
                                {order.paymentType === "Debit" &&(
                                    <div className="w-full lg:w-1/2">
                                        <label htmlFor="nameOnCard" className="block mb-3 text-sm font-semibold text-gray-500">Name on card</label>
                                        <input value={order.nameOnCard} onChange = {(e) => setOrder({...order,nameOnCard:e.target.value})} name="nameOnCard" type="text" placeholder="Name on card" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                                    </div>
                                )}
                            </div>                                
                            {order.paymentType === "Debit" &&(
                                <div className="mt-4 space-x-0 lg:flex lg:space-x-4">
                                    <div className="w-full lg:w-1/2">
                                        <label htmlFor="expiration" className="block mb-3 text-sm font-semibold text-gray-500">Expiration</label>
                                        <input value={order.expiration} onChange = {(e) => setOrder({...order,expiration:e.target.value})} name="expiration" type="month" min="2000-01" placeholder="Expiration" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                                    </div>
                                    <div className="w-full lg:w-1/2 ">
                                        <label htmlFor="cvv" className="block mb-3 text-sm font-semibold text-gray-500">CVV</label>
                                        <input value={order.cvv} onChange = {(e) => setOrder({...order,cvv:e.target.value})} name="cvv" type="number" placeholder="CVV" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                                    </div>
                                </div>
                            )}
                            {order.paymentType === "Credit" &&(
                                <div className="mt-4 space-x-0 lg:flex lg:space-x-4">
                                    <div className="w-full lg:w-1/3">
                                        <label htmlFor="expiration" className="block mb-3 text-sm font-semibold text-gray-500">Expiration</label>
                                        <input value={order.expiration} onChange = {(e) => setOrder({...order,expiration:e.target.value})} name="expiration" type="month" min="2000-01" placeholder="Expiration" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                                    </div>
                                    <div className="w-full lg:w-1/3 ">
                                        <label htmlFor="cvv" className="block mb-3 text-sm font-semibold text-gray-500">CVV</label>
                                        <input value={order.cvv} onChange = {(e) => setOrder({...order,cvv:e.target.value})} name="cvv" type="number" placeholder="CVV" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                                    </div>
                                    <div className="w-full lg:w-1/3 ">
                                        <label htmlFor="creditNumber" className="block mb-3 text-sm font-semibold text-gray-500">Credit number</label>
                                        <input value={order.creditNumber} onChange = {(e) => setOrder({...order,creditNumber:e.target.value})} name="creditNumber" type="number" placeholder="Credit number" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                                    </div>
                                </div>
                            )}
                            <div className="mt-4">
                                <button type = "submit" className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900">Order</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
                    <div className="pt-12 md:pt-0 2xl:ps-4">
                        <h2 className="text-xl font-bold">Order Summary
                        </h2>
                        <div className="mt-8">
                            <div className="flex flex-col space-y-4">
                                {cart.cartInfo.map((product:CartProduct) => 
                                    <div className="flex space-x-4" key={product.productInfo._id}>
                                        <div>
                                            <img src={product.productInfo.image} alt="image" className="w-60"/>
                                            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 align-middle">
                                                <button className="w-1/4" onClick={async () => {product.quantity--;await reduceQuantity(product.productInfo._id)}}>
                                                    <span className="">−</span>
                                                </button>
                                                <div className="text-center w-2/4 bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 outline-none">
                                                    {product.quantity}
                                                </div>
                                                {/* <input type="number" className="text-center w-2/4 bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 outline-none" name="custom-input-number" value={product.quantity} readOnly/> */}
                                                <button className="w-1/4" onClick={async () => {product.quantity++;await increaseQuantity(product.productInfo._id)}}>
                                                    <span className="">+</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold">{product.productInfo.name}</h2>
                                            <p className="text-sm">{product.productInfo.description}</p>
                                            <span className="text-red-600">Price</span> ${product.productInfo.price}
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Total<span className="ml-2">${cart.totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}