import { Router } from "express";
import { createPost } from "../controller/post/createPost";
import { getPostById } from "../controller/post/getPostById";



export const postRouter = Router()

postRouter.post('/create', createPost)
postRouter.get('/:id', getPostById )