import axios from 'axios'
import { useEffect, useState } from 'react'



interface IUser {
    userName: string,
    email: string,
    notify: boolean,
    profilePicture: string
}

export const useUserInfo = (token: string | null) => {
    const [userInfo,setUserInfo] = useState<IUser | null>(null);

    useEffect(() => {
        const fetchUserData = async() => {
            const options = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
                if(token) {
                    const response = await axios.get('http://localhost:3000/user/getUserInfo',options);
                    setUserInfo(response.data);
                } else {
                    setUserInfo(null);
                }
            }
        fetchUserData();
    },[token])
    return userInfo;
}