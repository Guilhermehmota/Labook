import { PostDatabase } from "../../data/post/PostDatabase"
import { postData } from "../../model/post"
import { getTokenData } from "../../services/authenticator"
import { generateId } from "../../services/idGenerator"
import { CustomError } from "../errors/CustomError"



export const createPostBusiness = async (
    postData: postData,
    token: string
) => {

    const author = getTokenData(token)
    const author_id = author.id

    const dateArray = postData.created_at.split("/")
    const day = dateArray[0]
    const month = dateArray[1]
    const year = dateArray[2]
    const correctDate = `${year}-${month}-${day}`
    postData.created_at = correctDate

    if (
        !postData.photo ||
        !postData.description ||
        !postData.type ||
        !postData.created_at
    ) {
        throw new CustomError(406, '"photo", "description", "type", "createAt" are required')
    }

    const id: string = generateId()

    const pd = new PostDatabase("labook_posts")
    await pd.createPost({
        ...postData,
        id,
        author_id
    })
}
