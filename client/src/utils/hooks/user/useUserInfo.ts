import axios from 'axios'
import { useQuery } from 'react-query'
import { getFromLocal } from '../../localStorage/getLocalValue'


interface IUser {
    userName: string,
    email: string,
    notify: boolean,
    profilePicture: string
}

export const useUserInfo = () => {

    const fetchUserData = async() => {
    const options = {
            headers: {
                Authorization: "Bearer " + getFromLocal()
            }
        }
        const response = await axios.get('http://localhost:3000/user/getUserInfo',options);
        return response.data;
    }
    const {data,isLoading,isError,error} = useQuery<IUser,Error>('user',fetchUserData);
    return {data,isLoading,isError,error}
}