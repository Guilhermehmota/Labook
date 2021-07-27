export enum POST_TYPES {
    NORMAL = "normal",
    EVENT = "event"
}

export type post = {
    id: string,
    photo: string,
    description: string,
    type: POST_TYPES,
    created_at: string,
    author_id: string
}

export type postData = {
    photo: string,
    description: string,
    type: POST_TYPES,
    created_at: string,
    author_id: string
}