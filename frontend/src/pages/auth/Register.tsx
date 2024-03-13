import React, {useState,useContext} from 'react';
import jwt_decode from 'jwt-decode';
import AxiosInstance from '../../util/Axios.jsx';
import AuthContext from '../../context/Context.jsx';
import { JwtPayload } from '../../interfaces/jwt.interface.js';

export function Register(){
    const {getLoggedIn} = useContext(AuthContext);
    const [page,setPage] = useState(0);
    const [user,setUser] = useState({
        email:'',
        name:'',
        password:'',
        passwordCheck:'',
        role:'',
        bankName:'',
        bankAccountNumber:''
    });
    const [err,setErr] = useState('');

    const registerSubmit = async (e:any) => {
        e.preventDefault()
        try{
            await AxiosInstance.post('/signup',user,{withCredentials:true}).then(async (response) => {
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
            }
        }catch(err:any){
            console.log(err);
        }
    }

    return(
        <>
            {user.role === '' &&(
                <div className="bg-gray-900">
                    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div className="p-6">
                            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                                Sign up a new account
                            </h1>
                            <p className='text-xs italic space-y-4 md:space-y-6 sm:p-2 cursor-pointer' onClick={() => {setUser({...user,role:'RESTAURANT'});setPage(0)}}>Trying to sign up your restaurant? Click here.</p>
                            <form className="space-y-4 md:space-y-6" onSubmit={registerSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                                    <input value = {user.email} onChange = {(e) => setUser({...user,email:e.target.value})} type="email" name="email" id="email" className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email"/>
                                </div>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Your name</label>
                                    <input value = {user.name} onChange = {(e) => setUser({...user,name:e.target.value})} type="text" name="name" id="name" className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your name"/>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                    <input value = {user.password} onChange = {(e) => setUser({...user,password:e.target.value})} type="password" name="password" id="password" placeholder="Enter you password" className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"/>
                                </div>
                                <div>
                                    <label htmlFor="passwordCheck" className="block mb-2 text-sm font-medium text-white">Password check</label>
                                    <input value = {user.passwordCheck} onChange = {(e) => setUser({...user,passwordCheck:e.target.value})} type="password" name="passwordCheck" id="passwordCheck" placeholder="Reenter you password" className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"/>
                                </div>
                                <button type="submit" className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Sign up</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {user.role === 'RESTAURANT' &&(
                <>
                    {page === 0 &&(
                        <div className="bg-gray-900">
                            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                                <div className="p-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                                        Sign up a new account
                                    </h1>
                                    <p className='text-xs italic space-y-4 md:space-y-6 sm:p-2 cursor-pointer' onClick={() => {setUser({...user,role:''});setPage(0)}}>Trying to sign up as a customer? Click here.</p>
                                    <form className="space-y-4 md:space-y-6" onSubmit={registerSubmit}>
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                                            <input value = {user.email} onChange = {(e) => setUser({...user,email:e.target.value})} type="email" name="email" id="email" className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email"/>
                                        </div>
                                        <div>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Your restaurant name</label>
                                            <input value = {user.name} onChange = {(e) => setUser({...user,name:e.target.value})} type="text" name="name" id="name" className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your restaurant name"/>
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                            <input value = {user.password} onChange = {(e) => setUser({...user,password:e.target.value})} type="password" name="password" id="password" placeholder="Enter you password" className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"/>
                                        </div>
                                        <div>
                                            <label htmlFor="passwordCheck" className="block mb-2 text-sm font-medium text-white">Password check</label>
                                            <input value = {user.passwordCheck} onChange = {(e) => setUser({...user,passwordCheck:e.target.value})} type="password" name="passwordCheck" id="passwordCheck" placeholder="Reenter you password" className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"/>
                                        </div>
                                        <button type="button" onClick={() => setPage(1)} className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-800">Next</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                    {page === 1 &&(
                        <div className="bg-gray-900">
                            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                                <div className="p-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                                        Sign up a new account
                                    </h1>
                                    <p className='text-xs italic space-y-4 md:space-y-6 sm:p-2 cursor-pointer' onClick={() => {setUser({...user,role:''});setPage(0)}}>Trying to sign up as a customer? Click here.</p>
                                    <form className="space-y-4 md:space-y-6" onSubmit={registerSubmit}>
                                        <div>
                                            <label htmlFor="bankName" className="block mb-2 text-sm font-medium text-white">Your bank name</label>
                                            <input value = {user.bankName} onChange = {(e) => setUser({...user,bankName:e.target.value})} type="text" name="bankName" id="bankName" className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your bank name"/>
                                        </div>
                                        <div>
                                            <label htmlFor="bankAccountNumber" className="block mb-2 text-sm font-medium text-white">Your bank account number</label>
                                            <input value = {user.bankAccountNumber} onChange = {(e) => setUser({...user,bankAccountNumber:e.target.value})} type="number" name="bankAccountNumber" id="bankAccountNumber" placeholder="Enter you bank account number" className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"/>
                                        </div>
                                        <div className='inline flex-col space-y-4 space-x-2'>
                                            <button type="button" onClick={() => setPage(0)} className="w-3/8 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-800">Previous</button>
                                            <button type="submit" className="w-3/8 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Sign up</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}