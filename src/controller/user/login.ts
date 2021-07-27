import { Request, Response } from "express";
import { CustomError } from "../../business/errors/CustomError";
import { UnauthorizedError } from "../../business/errors/UnauthorizedError";
import { loginBusiness } from "../../business/user/loginBusiness";



export const login = async (
    req: Request, 
    res:Response
): Promise<void> => {
    try {
        let message = "Success!"

        const { email, password } = req.body

        const token: string = await loginBusiness(email, password)

        if(!token){
            throw new UnauthorizedError()
        }

        res.status(200).send({ message, token })
        
    } catch (error) {
    let message = error.sqlMessage || error.message
    res.statusCode = 400
    res.send({ message })
    }
}