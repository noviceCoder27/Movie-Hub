import { useParams } from "react-router-dom"
import CreateThread from "./../../components/threads/CreateThread"
import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useThreads } from "../../utils/hooks/threads/useThreads";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import User from "../../components/user/User";

export const displayTime = (time: string) => {
  const dateObj = new Date(time);
  let hours = String(dateObj.getHours());
    let amOrPm;
    if(Number(hours) > 12) {
      hours = String(Number(hours) - 12);
      if(hours.length === 1) {
        hours = '0' + hours;
      }
      amOrPm = 'PM'
    } else {
      amOrPm = 'AM'
    }
    let minutes = String(dateObj.getMinutes());
    if(minutes.length === 1) {
      minutes = '0'+ minutes;
    }
    return `${hours}:${minutes}${amOrPm}`;
}


const Threads = () => {
  const {movieId} = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [createThread,setCreateThread] = useState(false);
  const {data,isLoading,isError,error} = useThreads(movieId);
  const [threads,setThreads] = useState(data);
  
  useEffect(() => {
    setThreads(data);
  },[data]);

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

  const openThread = (threadId:string) => {
    navigate(`/movies/${movieId}/threads/${threadId}`)
  }


  const displayThreads = threads?.map(threadObj => (
    <Flex 
        id = {threadObj._id}
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
          <Text>{threadObj.creator_name} at {displayTime(threadObj.createdAt)}</Text>
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
    <Box>
        <Navbar />
        <User />
        <Flex alignItems = {'center'} direction = {'column'} bg= {'black'} minH={'100vh'} >
            <Flex pt = {'10rem'} w= {'70%'}>
              <Button ml = {'auto'} bg = {'red.300'} _hover = {{bg: 'red.400'}} onClick={create}>Add a new thread</Button>
            </Flex>
            <Flex direction={'column'} width={'70%'} mt ={'3rem'} gap = {'1rem'} color ='white'>
              {displayThreads}
            </Flex>
            {createThread && <CreateThread setThreads = {setThreads} setCreateThread = {setCreateThread} isOpen = {isOpen} onClose = {onClose} />}
        </Flex >
    </Box>
    
  )
}


export default Threads
