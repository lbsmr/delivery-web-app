import React, {useState,useContext} from 'react';
import jwt_decode from 'jwt-decode';
import AxiosInstance from '../../util/Axios.jsx';
import AuthContext from '../../context/Context.jsx';
import { JwtPayload } from '../../interfaces/jwt.interface.js';

export function Login(){
    const {getLoggedIn} = useContext(AuthContext);
    const [user,setUser] = useState({
        email:'',
        password:''
    });
    const [err,setErr] = useState('');

    const loginSubmit = async (e:any) => {
        e.preventDefault()
        try{
            await AxiosInstance.post('/login',user,{withCredentials:true}).then(async (response) => {
                sessionStorage.setItem('access-token',response.data.token);
            }).catch(err => {
                setErr(err.response.data.msg);
            });
            const token: string | null = sessionStorage.getItem('access-token');
            if(token){
                const decodedToken = jwt_decode(token) as JwtPayload;
                if(decodedToken.role === "CLIENT"){
                    await getLoggedIn();
                    window.location.href = "/products"
                }else if(decodedToken.role === "RESTAURANT"){
                    await getLoggedIn();
                    window.location.href = `/hola`
                }
            } else {
                console.log("No token.")
            }
        }catch(err:any){
            console.log(err);
        }
    }

    return(
        <div className="bg-gray-900">
                <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={loginSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                                <input value = {user.email} onChange = {(e) => setUser({...user,email:e.target.value})} type="email" name="email" id="email" className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email"/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input value = {user.password} onChange = {(e) => setUser({...user,password:e.target.value})} type="password" name="password" id="password" placeholder="Enter you password" className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                            <button type="submit" className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Sign in</button>
                        </form>
                    </div>
                </div>
        </div>
    )
}