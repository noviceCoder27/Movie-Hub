import axios from "axios";
import { useQuery } from "react-query"


interface Thread {
    title: string,
    description: string,
    userName: string,
    createdAt: string
    _id: string,
}

export const useThreads = async (movieId:string| undefined) => {
    const options = {
        headers: {
            movie_id: movieId
        }
    }
    const getThreads = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/threads/getThreads`,options);
            return response.data;
        } catch(err) {
            throw new Error((err as Error).message);
        }
       
    }
    const {data,isLoading,isError,error} = useQuery<Thread[],Error>('threads',getThreads);
    return {data,isLoading,isError,error}
}


