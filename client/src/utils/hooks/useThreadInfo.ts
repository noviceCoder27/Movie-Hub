import axios from "axios";
import { useQuery } from "react-query"


export const useThreadInfo = async (threadId:string| undefined) => {
    const options = {
        headers: {
            movie_id: threadId
        }
    }
    const getThreads = async () => {
        const response = await axios.get(`http://localhost:3000/threads/getThread`,options);
        
    }
    const {data,isLoading,isError,error} = useQuery('threads',getThreads);
    return {data,isLoading,isError,error}
}
