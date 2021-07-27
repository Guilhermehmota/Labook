import { Request, Response } from "express";
import { CustomError } from "../../business/errors/CustomError";
import { UnauthorizedError } from "../../business/errors/UnauthorizedError";
import { createPostBusiness } from "../../business/post/createPostBusiness";
import { postData } from "../../model/post";
import { authenticationData } from "../../model/user";
import { getTokenData } from "../../services/authenticator";
import { generateId } from "../../services/idGenerator";



export const createPost = async (
    req: Request,
    res: Response
) => {
    try {
        
        let message = "Success!"

        const { photo, description, type, created_at} = req.body

        const token: string = req.headers.authorization as string

        const postData = {photo, description, type, created_at} as postData

        
        await createPostBusiness(postData, token)
        
        if(!token){
            throw new UnauthorizedError()
        }

        res.status(201).send({ message })
        
    } catch (error) {
    let message = error.sqlMessage || error.message
    res.statusCode = 400

    res.send({ message })
    }
}
