import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { AiFillDislike, AiFillLike } from "react-icons/ai"
import axios from "axios"
import { getThreadId } from "../../store/selectors/threads"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { getFromLocal } from "../../utils/localStorage/getLocalValue"
import { threadState } from "../../store/atoms/thread"
import { useUserInfo } from "../../utils/hooks/user/useUserInfo"
import { displayTime } from "../../utils/timestamp"

interface Props {
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    userName: string
    answerId: number,
    id: number
}

const Comment = ({content,likes,dislikes,createdAt,userName,answerId,id}: Props) => {
    const threadId = useRecoilValue(getThreadId);
    const setThread = useSetRecoilState(threadState);
    const data = useUserInfo();
    const options = {
        headers: {
            Authorization: "Bearer " + getFromLocal()
        }
    }
    const comment = {thread_id: threadId, answer_id: answerId, comment_id: id};
    const likeComment = async () => {
        try {
            const response = await axios.put('https://movie-hub-lqtp.onrender.com/user/likeComment',comment,options);
            setThread(response.data);
        } catch(err) {
            console.log("Error upvoting",err);
        }
    }

    const dislikeComment = async () => {
        try {
            const response = await axios.put('https://movie-hub-lqtp.onrender.com/user/dislikeComment',comment,options);
            setThread(response.data);

        } catch(err) {
            console.log("Error downvoting", err);
        }
    }

    return (
        <Flex direction={'column'} gap = {'1rem'}>
            <Text fontWeight={"500"}>{content}</Text>
                <Flex gap = {'1rem'} alignItems={'center'} bg ={'gray.800'} width={'fit-content'} p ={'1rem'}>
                    <Box>
                        <Text fontSize={'80%'} color = {'gray'}>answered by</Text>
                        <Text>{userName} at {displayTime(createdAt)}</Text>
                    </Box>
                    <Image src = {data?.profilePicture || 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png'} w= {'20%'} maxW={'50px'} alt = "User Icon"/>
                </Flex>
                <Flex alignItems={'center'} gap = {'1.2rem'}>
                    <Flex alignItems={'center'} gap = {'0.5rem'} >
                        <Box cursor={'pointer'} _hover = {{color: "red.300"}}>
                            {getFromLocal() && <AiFillLike onClick = {likeComment}/>}
                        </Box>
                        <Text>{likes-dislikes}</Text>
                        <Box cursor={'pointer'} _hover = {{color: "red.300"}}>
                            {getFromLocal() && <AiFillDislike onClick = {dislikeComment}/>}
                        </Box>
                    </Flex>
                </Flex>
        </Flex>
    )
}

export default Comment
