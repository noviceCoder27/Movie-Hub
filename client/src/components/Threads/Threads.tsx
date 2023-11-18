import axios from "axios";
import { useParams } from "react-router-dom"
import CreateThread from "./CreateThread";
import { useQuery } from "react-query";
import { useState } from "react";


const Threads = () => {
  const {movieId} = useParams();
  const [thread,setThread] = useState({title:"", description: "", movie_id: movieId});

  const fetchThreads = async () => {
    const options = {
      headers: {
        movie_id: thread.movie_id
      },
    }
    const response = await axios.get('http://localhost:3000/threads/getThreads',options);
    const {data} = response;
    return data;
  }

  const {data,isLoading,isError,error} = useQuery('threads',fetchThreads);
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

  const displayThreads = data?.map(threadObj => (
    <div key = {threadObj._id}>
      <div>{threadObj.title}</div>
      {threadObj.description}
    </div>
  ))
  
  return (
    <div>
        <CreateThread thread = {thread} setThread = {setThread}/>
        {displayThreads}
    </div>
  )
}


export default Threads
