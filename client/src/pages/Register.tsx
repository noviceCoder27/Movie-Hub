import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import Background from './../assets/batman.jpg'
import Form from "../components/user/Form";

const Register = () => {
    const [user,setUser] = useState({userName: '', email: '', password: ''})
    const register = async(e:React.FormEvent<HTMLDivElement>) => {
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
        <Flex minH = {'100vh'} backgroundImage={Background} backgroundSize={'cover'} pos = {'relative'}>
            <Box h= {'100vh'} pos = {'absolute'} top = {'0'} left = {'0'} color = {'white'} zIndex={"2"} bg = {'black'} w= {'100%'} opacity={'50%'}></Box>
            <Form formAction = {register} setUser = {setUser} heading = {'SIGN UP'} text = {{phrase: "Already have an account?", action: "Sign In"}}/>
        </Flex>
        
    )
}

export default Register
