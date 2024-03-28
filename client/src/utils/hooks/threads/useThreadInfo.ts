import axios from "axios";
import { useQuery } from "react-query"
import { getFromLocal } from "../../localStorage/getLocalValue";
const backend_url = import.meta.env.VITE_BACKEND_URL


export const useThreadInfo = (threadId:string| undefined) => {
    const options = {
        headers: {
            thread_id: threadId,
            Authorization: "Bearer " + getFromLocal()
        }
    }
    const getThreadInfo = async () => {
        const response = await axios.get(`${backend_url}/threads/getThread`,options);
        return response.data;
    }
    const {data,isLoading,isError,error} = useQuery(['thread',threadId],getThreadInfo);
    return {data,isLoading,isError,error}
}
