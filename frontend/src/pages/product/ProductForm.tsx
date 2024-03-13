import React, {useState,useContext,useEffect} from "react";
import {useParams} from "react-router-dom";

import AxiosInstance from '../../util/Axios';
import AuthContext from "../../context/Context";

export function ProductForm(){
    const {id} = useParams();
    const {roleAndId} = useContext(AuthContext);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        image: ''
    });
    const [err,setErr] = useState('');

    useEffect(() => {
        const getProduct = async () => {
            if(id){
                await AxiosInstance.get(`/product/${id}`,{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}}).then((results) => {
                    setProduct({
                        name:results.data.name,
                        description:results.data.description,
                        price: results.data.price,
                        image:results.data.image
                    })
                }).catch(err => {
                    console.log(err.response.data.msg);
                });
            }

        }
        getProduct();
    },[])

    const createProduct = async () => {
        try {
            if(roleAndId){
                await AxiosInstance.post('/create-product',product,{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}}).then(async (response) => {
                    if(response.data.msg === "Product created."){
                        window.location.href = `/products/${roleAndId.accountId}`
                    }
                }).catch(err => {
                    setErr(err.response.data.msg);
                });
            } else {
                console.log("Error happened.")
            }
        } catch (err:any) {
            console.log(err)
        }
    }

    const updateProduct = async () => {
        try {
            await AxiosInstance.patch(`/update-product/${id}`,{...product},{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}});
            window.location.href = "/products"
        } catch (err:any) {
            console.log(err)
        }
    }

    return(
        <div className="bg-gray-900">
            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                <div className="p-6">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                        {id ? `Update product` : "Create a new product"}
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={async () => {
                        if(id){
                            await updateProduct();
                        } else {
                            await createProduct();
                        }
                    }}>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Product name</label>
                            <input value = {product.name} onChange = {(e) => setProduct({...product,name:e.target.value})} type="text" name="name" id="name" className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter product name"/>
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">Product description</label>
                            <input value = {product.description} onChange = {(e) => setProduct({...product,description:e.target.value})} type="text" name="description" id="description" className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter product description"/>
                        </div>
                        <div>
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-white">Image URL</label>
                            <input value = {product.image} onChange = {(e) => setProduct({...product,image:e.target.value})} type="text" name="image" id="image" placeholder="Enter product image URL" className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                        <div>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-white">Product price</label>
                            <input value = {product.price} onChange = {(e) => setProduct({...product,price:e.target.value})} type="number" name="price" id="price" placeholder="Enter product price" className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                        <button type="submit" className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">{id ? "Update product" : "Create product"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}