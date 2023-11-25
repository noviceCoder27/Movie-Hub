import Navbar from '../components/Navbar'
import { Flex, Image } from '@chakra-ui/react'
import Background from '../assets/background2.png'
import User from '../components/user/User';

 

const Home = () => {

    return (
        <Flex h="100vh" direction= "column" pos = {'relative'}>
            <Navbar />
            <User />
            <Image src = {Background} w = "100%" h = "100%" position="absolute" zIndex= "-1"/>
        </Flex>
    )
}

export default Home
