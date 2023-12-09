import { Flex } from "@chakra-ui/react"
import { IComment } from "../../pages/threads/Thread"
import Comment from "./Comment"

interface Props {
    comments: IComment[],
    answerId: number
}

const Comments = ({comments,answerId}: Props) => {
    const displayComments = comments?.map(comment => (
        <Comment 
        key = {comment.comment_id} 
        content = {comment.content} 
        likes= {comment.likes} 
        dislikes = {comment.dislikes}
        createdAt = {comment.createdAt}
        userName = {comment.user_name}
        answerId = {answerId}
        id = {comment.comment_id}
        />
    ))
    return (
        <Flex direction = {'column'} gap = {'1rem'}>
            {displayComments}
        </Flex >
    )
}

export default Comments
