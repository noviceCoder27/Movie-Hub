import { Button, Flex, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import Background from './../../assets/batman2.jpg'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setWithExpiry } from "../../utils/localStorage/setLocalValue";


interface Props {
    formAction: string,
    heading: string
    text: {phrase: string,action: string}
        
}

const Form = ({formAction,heading,text}: Props) => {
    const [user,setUser] = useState({userName: '', email: '', password: ''});
    const navigate = useNavigate();
    const submit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/user/${formAction}`,user);
            const token = response.data.token;
            setWithExpiry("token",token);
            navigate('/');
        } catch(err) {
            console.log(err);
        }
    }


    return (
        <FormControl 
        pos = {'relative'} 
        zIndex = {'3'} 
        margin = {'auto'} 
        w= {{base: '80%', md: '60%',xl: '40%'}}  
        color = {'white'} 
        p = {'2rem'} 
        backgroundImage={Background}
        backgroundSize={'cover'}
        borderRadius={'20px'}
        boxShadow={"2px 2px 15px 2px #2A2929"}
        >
            <Heading mb = {'0.5rem'}>{heading}</Heading>
            <Flex mb = {'1.5rem'} gap = {'0.3rem'}>
                <Text>{text.phrase}</Text>
                <Text color = {'blue.500'} _hover = {{color: 'blue.600'}}>
                    <Link to = {heading === "LOGIN"? "/register": "/login"}>{text.action}</Link> 
                </Text> 
            </Flex>
            <FormLabel htmlFor="userName">User name:</FormLabel>
            <Input type="text" id = "userName" onChange={(e) => setUser(prev => ({...prev,userName: e.target.value}))}/>
            <FormLabel mt = {'1rem'} htmlFor="email">Email:</FormLabel>
            <Input type="text" id = "email" onChange={(e) => setUser(prev => ({...prev,email: e.target.value}))}/>
            <FormLabel mt = {'1rem'} htmlFor="password">Password:</FormLabel>
            <Input type="text" id = "password" onChange={(e) => setUser(prev => ({...prev,password: e.target.value}))}/>
            <Button mt = {'3rem'} bg= {'transparent'} color = {'white'} border = {'2px solid white'} _hover={{color: "black",bg:"white"}}onClick = {(e) => submit(e)}>{heading === "LOGIN" ? "Login" : "Create Account"}</Button>
        </FormControl>
    )
}

export default Form
