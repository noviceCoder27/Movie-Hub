import { Box, Button, CircularProgress, Flex, Heading, Image, Text, useDisclosure } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import Navbar from "../../components/Navbar"
import User from "../../components/user/User";
import CreateAnswer from "../../components/threads/CreateAnswer";
import { useThreadInfo } from "../../utils/hooks/threads/useThreadInfo";
import { useEffect, useState } from "react";
import { displayTime } from './Threads';
import Answers from "../../components/threads/Answers";
import { useRecoilState } from "recoil";
import { threadState } from "../../store/atoms/thread";
import { useUserInfo } from "../../utils/hooks/user/useUserInfo";


export interface IComment {
    content: string,
    likes: number,
    dislikes: number,
    user_id: string,
    comment_id: number,
    user_name: string,
    createdAt: string
}

interface Answer {
    content: string,
    comments: IComment[],
    likes: number,
    dislikes: number,
    user_id: string,
    answer_id: number,
    user_name: string,
    createdAt: string
}

export interface Discussion {
    answers: Answer[]
}
export interface Thread {
    createdAt: string,
    creator_id: string,
    creator_name: string,
    description: string,
    discussion_box: Discussion,
    movie_id: string,
    title: string,
    updatedAt: string,
    __v?: number,
    _id: string,
}

export interface AnswerValues {
    thread_id: string | undefined;
    content: string;
    answer_id: number | null;
}


const Thread = () => {
    const {threadId} = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {data,isLoading,isError,error} = useThreadInfo(threadId);
    const [threadInfo,setThreadInfo] = useRecoilState(threadState);
    const [answer,setAnswer] = useState<AnswerValues>({thread_id: threadId,content: "",answer_id: null});
    const {data:userData} = useUserInfo();

    useEffect(() => {
        setThreadInfo(data);
    },[data,setThreadInfo]);
   
    if(isLoading) {
        return (
          <Flex h = {'100vh'} alignItems = {'center'} justifyContent={'center'} bg = {'black'}>
              <CircularProgress isIndeterminate color='red.300' size={'50%'} mt = {'5rem'} position={'absolute'} left = {'43%'}/>
          </Flex>
        )
    }
    
    if(isError) {
        return (
            <div>Error loading threads: {(error as Error).message}</div>
        )
    }

    const openAnsModal = () => {
        setAnswer(prev=> ({...prev,answer_id: null}));
        onOpen();
    }

    return (
        <Box minH = {'100vh'} bg= {'black'}>
            <Navbar />
            <User />
            <Box color = {'white'} px = {'2rem'} >
                <Flex direction = {'column'} borderBottom={"2px solid"} borderColor={'red.300'}>
                    <Heading lineHeight = {'1.8rem'}mt= {{base: "2rem", lg:'10rem'}}>{threadInfo?.title}</Heading>
                    <Text mt= {'1.5rem'} color = {'gray.300'}>{threadInfo?.description}</Text>

                    <Flex mt= {'3rem'} mb = {'1rem'} gap={'1rem'} alignItems={'center'}>
                        <Box>  
                            <Text  color = {'gray'}>created by</Text>
                            <Text>{threadInfo?.creator_name} at {displayTime(threadInfo?.createdAt)}</Text>
                        </Box>
                        <Image src = {userData?.profilePicture || 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png'} w= {'10%'} maxW={'50px'} alt = "User Icon"/>
                        <Button ml ={'auto'} bg = {'transparent'} color ={'white'} border={'2px solid white'} borderRadius={'20px'} _hover = {{bg: "transparent", color: "red.300"}} onClick={openAnsModal}>Add Answer</Button>
                    </Flex>
                </Flex>
                <Answers onOpen = {onOpen} setAnswer = {setAnswer} discussion_box = {threadInfo?.discussion_box} />
            </Box>
            <CreateAnswer isOpen = {isOpen} onClose = {onClose} threadId = {threadId} answer ={answer} setAnswer = {setAnswer}/>
        </Box>
    )
}

export default Thread
