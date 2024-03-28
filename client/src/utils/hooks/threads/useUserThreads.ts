import axios from "axios";
import { useQuery } from "react-query"
import { Thread } from "../../../pages/threads/Thread";
import { getFromLocal } from "../../localStorage/getLocalValue";
const backend_url = import.meta.env.VITE_BACKEND_URL

export const useUserThreads = () => {
    
    const getThreads = async () => {
    const options = {
            headers: {
                "Authorization": "Bearer " + getFromLocal()
            }
        }
        try {
            const response = await axios.get(`${backend_url}/threads/getUserThreads`,options);
            return response.data;
        } catch(err) {
            throw new Error((err as Error).message);
        }
       
    }
    const {data,isLoading,isError,error} = useQuery<Thread[],Error>('threads',getThreads);
    return {data,isLoading,isError,error};
}
