import { hash } from "../../services/hashManager"
import { user, userData } from "../../model/user"
import { generateToken } from "../../services/authenticator"
import { generateId } from "../../services/idGenerator";
import { response } from "express";

import { UserDatabase } from "../../data/user/UserDatabase";


export const signupBusiness = async (
    userData: userData
):Promise<string> => {

    if (!userData.name || !userData.email || !userData.password) {
        response.statusCode = 406  
        throw new Error('"name", "email" and "password" must be provided')
    }

    
    const id: string = generateId()
    const cypherPassword = await hash(userData.password);
    
    const newUser: user = {
        ...userData,
        password: cypherPassword,
        id: id
    }
    
    const ud = new UserDatabase("labook_users")
    
    await ud.insertUser(newUser)
    
    const token: string = generateToken({ id: newUser.id })

    return token

}
