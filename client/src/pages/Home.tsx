import Navbar from '../components/Navbar'
import { Flex, Image } from '@chakra-ui/react'
import Background from '../assets/background2.png'


const Home = () => {

    return (
        <Flex h="100vh" direction= "column">
            <Navbar />
            <Image src = {Background} w = "100%" h = "100%" position="absolute" zIndex= "-1"/>
        </Flex>
    )
}

export default Home
