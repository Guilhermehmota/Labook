import { user } from "../../model/user";
import { BaseDatabase } from "../BaseDatabase";
import { connection } from "../connection";


export class UserDatabase extends BaseDatabase {

    private tableName: string;

    constructor(tableName: string) {
        super()
        this.tableName = tableName
    }


    insertUser = async (
        user: user
    ) => {
        await connection.insert(user).into(this.tableName)
    }

    selectUserByEmail = async (
        email: string
    ): Promise<user> => {
        try {
            const queryResult = await connection("labook_users")
                .select("*")
                .where({ email })

            const user: user = {
                id: queryResult[0].id,
                name: queryResult[0].name,
                email: queryResult[0].email,
                password: queryResult[0].password
            }

            return user
        } catch (error) {
            throw new Error(error.slqMessage || error.message)
        }
    }

}
