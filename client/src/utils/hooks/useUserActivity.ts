import axios from "axios";
import { useQuery } from "react-query"
import { getFromLocal } from "../localStorage/getLocalValue";
const backend_url = import.meta.env.VITE_BACKEND_URL

export interface Activity {
    _id: string,
    content: string,
    thread_id: string,
    answer_id: number,
    movie_id: string,
}

export const useUserActivity = () => {
    
    const getThreads = async () => {
        const options = {
            headers: {
                "Authorization": "Bearer " + getFromLocal()
            }
        }
        try {
            const response = await axios.get(`${backend_url}/activity/userActivities`,options);
            return response.data;
        } catch(err) {
            throw new Error((err as Error).message);
        }
       
    }
    const {data,isLoading,isError,error} = useQuery<Activity[],Error>('threads',getThreads);
    return {data,isLoading,isError,error};
}
