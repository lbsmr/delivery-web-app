import { JwtPayload } from "./jwt.interface"

export interface IContext{
    loggedIn:Boolean | undefined,
    getLoggedIn:() => Promise<void> | undefined, 
    roleAndId:JwtPayload | undefined,
    setRoleAndId:React.Dispatch<React.SetStateAction<{accountId: string; role: string; iat: number;}>> | undefined
}