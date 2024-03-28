import { useEffect, useState } from "react";
import { Box, CircularProgress, Flex,Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import User from "../components/user/User";
import { useUserActivity } from "../utils/hooks/useUserActivity";
import { CiLocationArrow1 } from "react-icons/ci";
import { HashLink } from 'react-router-hash-link';

const Activities = () => {
  const {data,isLoading,isError,error} = useUserActivity();
  const [activities,setActivities] = useState(data);
  useEffect(() => {
    setActivities(data);
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

  
  const filteredActivities = activities ? [...activities].reverse(): null;


  const displayActivities = filteredActivities?.map(activity => (
    <HashLink smooth to={`/movies/${activity.movie_id}/threads/${activity.thread_id}/#${activity.answer_id}`} key = {activity._id} >
        <Flex 
          justify={'space-between'}
          alignItems = {'center'}
          borderRadius = {'12px'}
          width = {{lg: '70%'}}
          bg= {'gray.800'}
          p = {'1.5rem'}
          boxShadow={"0px 2px 7px 1px #484848"}
          cursor = {'pointer'}
          _hover = {{bg: 'gray.900'}}
        >
          <Text fontWeight={'600'} fontSize={'x-large'}>{activity?.content}</Text>
          <CiLocationArrow1 size = "2em"/>
        </Flex>
    </HashLink>
    
  ))


  
  return (
    <Box >
        <Navbar />
        <User />
        <Flex alignItems = {'center'} direction = {'column'} bg= {'black'} minH={'100vh'} pb ={'2rem'}>
            <Flex direction={'column'} pt = {{lg: '10rem'}} width={'70%'} mt ={'3rem'} gap = {'1rem'} color ='white'>
              {displayActivities}
            </Flex>
        </Flex >
    </Box>
    
  )
}


export default Activities
