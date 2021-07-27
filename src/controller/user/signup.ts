import { Request, Response } from "express";
import { CustomError } from "../../business/errors/CustomError";
import { UnauthorizedError } from "../../business/errors/UnauthorizedError";
import { signupBusiness } from "../../business/user/signupBusiness";
import { userData } from "../../model/user";



export const signup = async (
    req: Request,
    res: Response
) => {
    try {
        let message = "Success!"

        const { name, email, password } = req.body

        const userData = {name, email, password} as userData

        const token: string = await signupBusiness(userData)

        if(!token){
            throw new UnauthorizedError()
        }

        res
            .status(201)
            .send({ message, token })

    } catch (error) {

        res.statusCode = 400
        let message = error.sqlMessage || error.message

        res.send({ message })
    }
}

