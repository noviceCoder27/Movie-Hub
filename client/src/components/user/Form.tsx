import { Button, Flex, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom";

interface Props {
    formAction: (e: React.FormEvent<HTMLDivElement>) => Promise<void>,
    setUser: React.Dispatch<React.SetStateAction<{
                userName: string;
                email: string;
                password: string;
            }>>,
    heading: string
    text: {phrase: string,action: string}
        
}

const Form = ({formAction,setUser,heading,text}: Props) => {
  return (
    <FormControl 
    pos = {'relative'} 
    zIndex = {'3'} 
    margin = {'auto'} 
    w= {{base: '80%', md: '60%',xl: '40%'}} 
    bg= {'linear-gradient(130deg, rgba(0,0,0,1) 68%, rgba(179,156,156,1) 100%)'} 
    color = {'white'} 
    p = {'2rem'} 
    borderRadius={'12px'}
    boxShadow={"0px 2px 15px 1px #2A2929"}
    onSubmit={(e) => formAction(e)}>
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
        <Button mt = {'3rem'} bg= {'transparent'} color = {'white'} border = {'2px solid white'} _hover={{color: "black",bg:"white"}}>{heading === "LOGIN" ? "Login" : "Create Account"}</Button>
    </FormControl>
  )
}

export default Form
