import { PostDatabase } from "../../data/post/PostDatabase"
import { post } from "../../model/post"
import { NotFoundError } from "../errors/NotFoundError"


export const getPostByIdBusiness = async (
    id: string
): Promise<post>=> {


    const pd = new PostDatabase("labook_posts")
    
    const result = await pd.getPostById(id) 

    const date = new Date(result.created_at).toISOString()
    const splitDate = date.split("T")
    const splittedDate = splitDate[0].split("-")
    const correctedDate = `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`

    result.created_at = correctedDate

    if(!result) {
        throw new NotFoundError()
    }

    return result
}