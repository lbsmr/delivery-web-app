import React, {createContext,useEffect,useState} from 'react';
import jwt_decode from 'jwt-decode';
import AxiosInstance from '../util/Axios';
import { JwtPayload } from '../interfaces/jwt.interface';
import { IContext } from '../interfaces/context.interface';

const AuthContext = createContext<IContext>({
    loggedIn:undefined,
    getLoggedIn:() => undefined, 
    roleAndId:undefined,
    setRoleAndId:undefined
});

function AuthContextProvider(props:any) {
    const [loggedIn,setLoggedIn] = useState(false);
    const [roleAndId,setRoleAndId] = useState({
        accountId:'',
        role:'',
        iat:0
    });

    async function getLoggedIn(){
        const loggedInRes = await AxiosInstance.get('/loggedin',{withCredentials:true,headers:{'access-token': sessionStorage.getItem('access-token')}});
        if(loggedInRes.data !== true){
            setLoggedIn(false);
        }else{
            setLoggedIn(true);
        }
    }
    
    async function getRoleAndId(){
        try {
            const token: string | null = sessionStorage.getItem('access-token');
            if(token){
                const decodedToken = jwt_decode(token) as JwtPayload;
                console.log(decodedToken.accountId)
                console.log(decodedToken.role)
                setRoleAndId({'iat':decodedToken.iat,'accountId':decodedToken.accountId,'role':decodedToken.role})
            } else {
                console.log("No token.")
            }
        } catch (err:any) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getLoggedIn();
        getRoleAndId();
    },[]);

    return(
        <AuthContext.Provider value = {{ loggedIn , getLoggedIn , roleAndId , setRoleAndId }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export {AuthContextProvider};