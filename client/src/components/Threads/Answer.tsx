import { Box, Button, Flex, Image, Text } from "@chakra-ui/react"
import { GoReply } from "react-icons/go";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { useState } from "react";
import { displayTime } from "../../pages/threads/Threads";
import { AnswerValues, IComment } from "../../pages/threads/Thread";
import Comments from "./Comments";
import { getFromLocal } from "../../utils/localStorage/getLocalValue";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { threadState } from "../../store/atoms/thread";
import { getThreadId } from "../../store/selectors/threads";
import { useUserInfo } from "../../utils/hooks/user/useUserInfo";

interface Props {
    id: string,
    content:string,
    likes: number,
    dislikes: number,
    userName: string,
    createdAt: string,
    answerId: number,
    setAnswer:  React.Dispatch<React.SetStateAction<AnswerValues>>,
    comments: IComment[],
    onOpen: () => void
}


const Answer = ({onOpen,content,likes,dislikes,userName,createdAt,setAnswer,answerId,comments,id}:Props) => {
    const [showReplies,setShowReplies] = useState(false);
    const threadId = useRecoilValue(getThreadId);
    const setThread = useSetRecoilState(threadState);
    const data = useUserInfo();

    const setAnswerId = () => {
        setAnswer(prev=> ({...prev,answer_id: answerId}));
    }
    const generateComment = () => {
        setAnswerId();
        onOpen();   
    }

    const options = {
        headers: {
            Authorization: "Bearer " + getFromLocal()
        }
    }
    const answer = {thread_id: threadId, answer_id: answerId};

    const likeAnswer = async () => {
        try {
            const response = await axios.put('https://movie-hub-production.up.railway.app/user/likeAnswer',answer,options);
            setThread(response.data);
        } catch(err) {
            console.log("Error upvoting",err);
        }
    }

    const dislikeAnswer = async () => {
        try {
            const response = await axios.put('https://movie-hub-production.up.railway.app/user/dislikeAnswer',answer,options);
            setThread(response.data);

        } catch(err) {
            console.log("Error downvoting", err);
        }
    }

    return (
        <Flex id = {id} direction = {"column"} gap = {"2rem"} borderLeft={"1px solid"} borderColor = {"gray"} p= {"1rem"}>
            <Text fontWeight={"500"}>{content}</Text>
            <Flex gap = {'1rem'} alignItems={'center'} bg ={'gray.800'} width={'fit-content'} p ={'1rem'}>
                <Box>
                    <Text fontSize={'80%'} color = {'gray'}>answered by</Text>
                    <Text>{userName} at {displayTime(createdAt)}</Text>
                </Box>
                <Image src = {data?.profilePicture || 'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png'} w= {'20%'} maxW={'50px'} alt = "User Icon"/>
            </Flex>
            <Flex alignItems={'center'} gap = {'1.2rem'}>
                <Flex alignItems={'center'} gap = {'0.5rem'} >
                    <Box cursor={'pointer'} _hover = {{color: "red.300"}}>
                        <AiFillLike onClick = {likeAnswer}/>
                    </Box>
                    <Text>{likes-dislikes}</Text>
                    <Box cursor={'pointer'} _hover = {{color: "red.300"}}>
                        <AiFillDislike onClick = {dislikeAnswer}/>
                    </Box>
                </Flex>
                <Box cursor={'pointer'} _hover={{color: 'blue.300'}}>
                    <GoReply onClick = {generateComment}/>
                </Box>
            </Flex>
            <Button onClick={() => setShowReplies(prev => !prev)} maxW={'500px'}>{showReplies ? 'Hide': 'Show'} Replies</Button>
            <Flex ml = "1rem" borderLeft={"1px solid gray"} p ={'1rem'} display={showReplies ? "flex": "none"}>
                <Comments comments = {comments} answerId = {answerId}/>
            </Flex>
        </Flex>
    )
}

export default Answer
