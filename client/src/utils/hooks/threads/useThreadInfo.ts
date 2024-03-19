import axios from "axios";
import { useQuery } from "react-query"
import { getFromLocal } from "../../localStorage/getLocalValue";



export const useThreadInfo = (threadId:string| undefined) => {
    const options = {
        headers: {
            thread_id: threadId,
            Authorization: "Bearer " + getFromLocal()
        }
    }
    const getThreadInfo = async () => {
        const response = await axios.get(`https://movie-hub-lqtp.onrender.com/threads/getThread`,options);
        return response.data;
    }
    const {data,isLoading,isError,error} = useQuery(['thread',threadId],getThreadInfo);
    return {data,isLoading,isError,error}
}
