import { response } from "express"
import { UserDatabase } from "../../data/user/UserDatabase"
import { user } from "../../model/user"
import { generateToken } from "../../services/authenticator"
import { compare } from "../../services/hashManager"
import { CustomError } from "../errors/CustomError"

export const loginBusiness = async (
    email: string,
    password: string
) => {

    if (!email || !password) {
        throw new CustomError(406, '"email" and "password" must be provided')
    }

    const ud = new UserDatabase("labook_users")

    const user: user = await ud.selectUserByEmail(email)

    const passwordIsCorrect: boolean = await compare(password, user.password)

    if (!passwordIsCorrect) {
        throw new CustomError(422,"Invalid credentials")
    }

    const token: string = generateToken({
        id: user.id
    })

    return token
}