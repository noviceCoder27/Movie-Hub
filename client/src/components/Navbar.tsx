import { Flex, Image, Box, Heading, useDisclosure, Collapse,Text } from "@chakra-ui/react"
import Title from '../assets/title.png'
import Title2 from '../assets/title2.png'
import {GiHamburgerMenu} from 'react-icons/gi'
import { Link } from "react-router-dom"



const Navbar = () => {
    const { isOpen, onToggle } = useDisclosure()
    return (
        <Flex direction={"column"} justifyContent = {'center'} bg = {"white"} pos={{lg: 'absolute'}} zIndex={'2'} top = {'2rem'} left = {'15%'} width={{lg: "70vw"}} borderRadius={{lg: "30px"}} height = {{lg:" 70px"}} border={{lg: "4px solid black"}}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Box >
                    <Link to = "/" style = {{display: "flex", alignItems: "center"}}>
                        <Image src = {Title2} w = {{base: "100px", xl: "120px"}} h = {{base: "80px", xl: "120px"}} loading="lazy" display = {{base: "none", xl: "block"}} pos = {{xl:"absolute"}} left = {'40%'} bgColor={{xl:'black'}} borderRadius={{xl:'50%'}} border ={{xl: "4px solid white"}} zIndex={'1'}/>
                        <Image src = {Title} w = {{base: "100px", xl: "120px"}} h = {{base: "80px", xl: "120px"}} loading="lazy" display={{base: "block", xl: "none"}}/>
                        <Heading fontSize={"x-large"} ml = {{md: "3rem"}}>Movie <span style = {{color: "red"}}>Hub</span></Heading>
                    </Link>
                </Box>   
                <Flex gap = {"1rem"} pr = {"1.5rem"} fontSize={"medium"} fontWeight = {"500"}display={{base: "none",md: "flex"}}>
                        <Text _hover = {{color: "red",transform: "scale(1.1)"}}>
                            <Link to = "/now_playing">Now Playing</Link>
                        </Text>
                        <Text _hover = {{color: "red",transform: "scale(1.1)"}}>
                            <Link to = "/popular">Popular</Link>
                        </Text>
                        <Text _hover = {{color: "red",transform: "scale(1.1)"}}>
                            <Link to = "/top_rated">Top Rated</Link>
                        </Text>
                        <Text _hover = {{color: "red",transform: "scale(1.1)"}}>
                            <Link to = "/upcoming">Upcoming</Link>
                        </Text>
                </Flex>  
                <Box pr = {"1rem"} fontSize={"xx-large"} display={{md: "none"}}>
                    <GiHamburgerMenu style = {{cursor: "pointer"}} onClick = {onToggle}/>
                </Box>
            </Flex>
            <Collapse in={isOpen}>
                <Flex direction={"column"} p = {"1rem"} gap={"1rem"} pl="1.5rem">
                    <Text _hover = {{color: "red"}}>
                        <Link to = "/now_playing">Now Playing</Link>
                    </Text>
                    <Text _hover = {{color: "red"}}>
                        <Link to = "/popular">Popular</Link>
                    </Text>
                    <Text _hover = {{color: "red"}}>
                        <Link to = "/top_rated">Top Rated</Link>
                    </Text>
                    <Text _hover = {{color: "red"}}>
                        <Link to = "/upcoming">Upcoming</Link>
                    </Text>
                </Flex> 
            </Collapse>
             
        </Flex>
    )
}

export default Navbar
