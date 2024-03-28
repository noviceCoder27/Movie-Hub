import { useEffect, useState } from "react";
import { Box, CircularProgress, Flex, Image, Text } from "@chakra-ui/react";
import { useUserThreads } from "../../utils/hooks/threads/useUserThreads";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import User from "../../components/user/User";
import { Thread } from "./Thread";
import { displayTime } from "../../utils/timestamp";



const UserThreads = () => {
  const navigate = useNavigate();
  const {data,isLoading,isError,error} = useUserThreads();
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

  const openThread = (threadObj: Thread) => {
    navigate(`/movies/${threadObj.movie_id}/threads/${threadObj._id}`)
  }

  const filteredThreads = threads ? [...threads].reverse(): null;

  const displayThreads = filteredThreads?.map(threadObj => (
    <Flex 
        key = {threadObj?._id} 
        justify={'space-between'}
        alignItems = {'center'}
        borderRadius = {'12px'}
        width = {{lg: '70%'}}
        bg= {'gray.800'}
        p = {'1rem'}
        boxShadow={"0px 2px 7px 1px #484848"}
        cursor = {'pointer'}
        _hover = {{bg: 'gray.900'}}
        onClick={() => openThread(threadObj)}
    >
      <Box>
        <Text fontWeight={'600'} fontSize={'x-large'}>{threadObj?.title}</Text>
        <Text color = {'gray'}>{threadObj?.description}...</Text>
      </Box>
      <Flex gap = {'1rem'}>
        <Box>
          <Text color = {'gray'}>Created by</Text>
          <Text>{threadObj?.creator_name} at {displayTime(threadObj?.createdAt)}</Text>
        </Box>
        <Image w = {'50px'} src = {'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png'} alt = "User Image" />
      </Flex>
    </Flex>
  ))


  
  return (
    <Box>
        <Navbar />
        <User />
        <Flex alignItems = {'center'} direction = {'column'} bg= {'black'} minH={'100vh'} pb = {'2rem'}>
            <Flex direction={'column'} pt = {{lg: '10rem'}} width={'70%'} mt ={'3rem'} gap = {'1rem'} color ='white'>
              {displayThreads}
            </Flex>
        </Flex >
    </Box>
    
  )
}


export default UserThreads
