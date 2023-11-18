import axios from "axios";
import { useState } from "react";


const Login = () => {
    const [user,setUser] = useState({userName: '', email: '', password: ''})
    const login = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/user/login',user);
            const token = response.data.token;
            localStorage.setItem("token",token);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={(e) => login(e)}>
            <label htmlFor="userName">User name:</label>
            <input type="text" id = "userName" onChange={(e) => setUser(prev => ({...prev,userName: e.target.value}))}/>
            <label htmlFor="email">Email:</label>
            <input type="text" id = "email" onChange={(e) => setUser(prev => ({...prev,email: e.target.value}))}/>
            <label htmlFor="password">Password:</label>
            <input type="text" id = "password" onChange={(e) => setUser(prev => ({...prev,password: e.target.value}))}/>
            <button>Submit</button>
        </form>
    )
}

export default Login
