import { Box, Flex } from "@chakra-ui/react";
import Background from './../assets/batman.jpg'
import Form from "../components/user/Form";



const Register = () => {
    
    return (
        <Flex minH = {'100vh'} backgroundImage={Background} backgroundSize={'cover'} pos = {'relative'}>
            <Box h= {'100vh'} pos = {'absolute'} top = {'0'} left = {'0'} color = {'white'} zIndex={"2"} bg = {'black'} w= {'100%'} opacity={'50%'}></Box>
            <Form formAction = {'register'} heading = {'SIGN UP'} text = {{phrase: "Already have an account?", action: "Sign In"}}/>
        </Flex>
        
    )
}

export default Register
