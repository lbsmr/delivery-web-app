import React, {useEffect,useState} from "react";
import {Link,useParams} from 'react-router-dom';

import AxiosInstance from '../../util/Axios';

import { IProduct } from "../../interfaces/product.interface";

export function ProductList() {
    const [products,setProducts] = useState([]);
    const {id} = useParams()

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await AxiosInstance.get('/products',{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}});
                const p = res.data
                if(id){
                    const sellerProducts = p.filter((product:IProduct) => product.creatorId == id);
                    setProducts(sellerProducts)
                } else {
                    setProducts(p)
                }
            } catch (err:any) {
                console.log(err)
            }
        }
        getProducts();
    },[])

    const addToCart = async (productId:string) => {
        await AxiosInstance.post('/addtocart',{"productId":productId},{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}}).then(async(response) => {
            console.log(response)
        }).catch(err =>{
            console.log(err)
        })
    }

    return(
        <div className="max-w-[85rem] w-[95%] my-8 mx-auto">
                {products.map((product:IProduct) => {
                    return(
/*                         <div className="p-4 bg-slate-600 shadow-md rounded-2xl mb-10">
                            <li className="flex justify-between m-4 pb-4 border-bottom" key = {product._id}>
                                <div className="space-y-4 md:space-y-6">
                                    <div className="flex flex-row flex-wrap justify-around items-center py-3">
                                        <div className="inline m-0 w-[50%] m-0">
                                            <img src = {product.image} className="w-[15rem] h-[8rem]"/>
                                        </div>
                                        <div className="inline ml-5 text-left w-[30%]">
                                            <h3 className="-mt-3 mb-1 text-lg">{product.name}</h3>
                                            <div className="italic">{product.description}</div>
                                            <div className="mt-1 font-bold text-xl text-yellow-550">${product.price}</div>
                                        </div>
                                        <div className="w-[10%]">
                                            <button className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800" type = "button" onClick={async() => {await addToCart(product._id)}}>Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </div> */
                        <div key = {product._id} className="mb-10 py-5 flex flex-col items-center bg-gray-800 border border-gray-700 rounded-lg shadow md:flex-row md:max-w-xl">
                            <img className="ml-5 object-cover w-full rounded-t-lg h-96 md:h-36 md:w-48 md:rounded-none md:rounded-l-lg" src={product.image} alt=""/>
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="text-left mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                                <p className="text-left mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
                                <div className="flow-root">
                                    <p className="float-left mt-1 font-bold text-xl text-yellow-550">${product.price}</p>
                                    <button className="float-right text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800" type = "button" onClick={async() => {await addToCart(product._id)}}>Add to cart</button>
                                </div>
                            </div>
                        </div>

                    )
                })}            
        </div>
    )
}