import { post } from "../../model/post";
import { BaseDatabase } from "../BaseDatabase";


export class PostDatabase extends BaseDatabase{
    private tableName: string;

    constructor(tableName: string){
        super();
        this.tableName = tableName
    }

    createPost = async(
        post: post
    ) => {

        await BaseDatabase.connection(this.tableName)
        .insert({
            id: post.id,
            photo: post.photo,
            description: post.description,
            type: post.type,
            created_at: post.created_at,
            author_id: post.author_id

        })
    }

    getPostById = async (
        id: string 
    ): Promise<any> => {
        const result: any = await BaseDatabase.connection.raw(`
        SELECT posts.*, name FROM ${this.tableName} AS posts
        JOIN labook_users AS users
        ON author_id = users.id
        WHERE posts.id = "${id}";
    `)

        return result[0][0]
    }

}
