import { Box, Flex } from "@chakra-ui/react";
import Background from './../assets/batman.jpg'
import Form from "../components/user/Form";


const Login = () => {
  
    return (
        <Flex minH = {'100vh'} backgroundImage={Background} backgroundSize={'cover'} pos = {'relative'}>
            <Box h= {'100vh'} pos = {'absolute'} top = {'0'} left = {'0'} color = {'white'} zIndex={"2"} bg = {'black'} w= {'100%'} opacity={'50%'}></Box>
            <Form formAction = {'login'} heading = {'LOGIN'} text = {{phrase: "Don't have an account?", action: "Sign Up"}}/>
        </Flex>
        
    )
}

export default Login
