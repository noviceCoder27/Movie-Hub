import { Flex, Image, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text } from "@chakra-ui/react"
import UserImg from './../../assets/user.png'
import { Link } from "react-router-dom"

const User = () => {
    return (
        <Flex pos = {'absolute'} h= {'12vh'} minH = {'50px'} maxH = {'70px'} left = {'2rem'} zIndex = {"4"} top = {'2rem'} bg = {'white'} borderRadius={'50%'} p = {'1rem'} border = {'4px solid black'}>
            <Popover placement= {'bottom-end'}>
                <PopoverTrigger>
                    <Image w= {'100%'} src = {UserImg} alt = "User Icon" cursor={'pointer'}/>
                </PopoverTrigger>
                <PopoverContent mt={'1rem'}>
                    <PopoverBody>
                        <Link to = "/register"><Text _hover = {{color: 'red'}}>Register</Text></Link>
                    </PopoverBody>
                    <PopoverBody>
                        <Link to = "/login"><Text _hover = {{color: 'red'}}>Login</Text></Link>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
            
        </Flex>
    )
}

export default User
