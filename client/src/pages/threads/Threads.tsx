import { useParams } from "react-router-dom"
import CreateThread from "./../../components/threads/CreateThread"
import { useState } from "react";
import { Box, Button, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useThreads } from "../../utils/hooks/useThreads";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import User from "../../components/user/User";


export interface Thread {
      _id: number,
      title: string,
      description: string,
      userName: string,
      time: string,
      movieId: string
}

const Threads = () => {
  const {movieId} = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [threads,setThreads] = useState<Thread[] | null>(null);
  const [createThread,setCreateThread] = useState(false);
  const {data,isLoading,isError,error} = useThreads(movieId);

  if(isLoading) {
    return (
      <div>Loading ...</div>
    )
  }

  if(isError) {
    return (
      <div>Error loading threads: {(error as Error).message}</div>
    )
  }

  const openThread = (threadId:string) => {
    navigate(`/movies/${movieId}/threads/${threadId}`)
  }


  const displayThreads = threads?.map(threadObj => (
    <Flex 
        key = {threadObj._id} 
        justify={'space-between'}
        alignItems = {'center'}
        borderRadius = {'12px'}
        width = {'70%'}
        bg= {'gray.800'}
        p = {'1rem'}
        boxShadow={"0px 2px 7px 1px #484848"}
        cursor = {'pointer'}
        _hover = {{bg: 'gray.900'}}
        onClick={() => openThread(String(threadObj._id))}
    >
      <Box>
        <Text fontWeight={'600'} fontSize={'x-large'}>{threadObj.title}</Text>
        <Text color = {'gray'}>{threadObj.description}...</Text>
      </Box>
      <Flex gap = {'1rem'}>
        <Box>
          <Text color = {'gray'}>Created by</Text>
          <Text>{threadObj.userName} at {threadObj.time}</Text>
        </Box>
        <Image w = {'50px'} src = {'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png'} alt = "User Image" />
      </Flex>
    </Flex>
  ))

  const create = () => {
    setCreateThread(true);
    onOpen();
  }

  
  return (
    <Flex alignItems = {'center'} direction = {'column'} bg= {'black'} minH={'100vh'} >
        <Navbar />
        <User />
        <Flex pt = {'10rem'} w= {'70%'}>
          <Button ml = {'auto'} bg = {'red.300'} _hover = {{bg: 'red.400'}} onClick={create}>Add a new thread</Button>
        </Flex>
        <Flex direction={'column'} width={'70%'} mt ={'3rem'} gap = {'1rem'} color ='white'>
          {displayThreads}
        </Flex>
        {createThread && <CreateThread setThreads = {setThreads} setCreateThread = {setCreateThread} isOpen = {isOpen} onClose = {onClose} />}
    </Flex >
  )
}


export default Threads
