import axios from "axios";
import { useQuery } from "react-query"
import { Thread } from "../../../pages/threads/Thread";


export const useThreads = (movieId:string| undefined) => {
    
    const getThreads = async () => {
        const options = {
            headers: {
                movie_id: movieId
            }
        }
        try {
            const response = await axios.get(`http://localhost:3000/threads/getThreads`,options);
            return response.data;
        } catch(err) {
            throw new Error((err as Error).message);
        }
       
    }
    const {data,isLoading,isError,error} = useQuery<Thread[],Error>('threads',getThreads);
    return {data,isLoading,isError,error};
}


