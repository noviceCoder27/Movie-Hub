import { Flex,
        Image,
        Box,
        Heading,
        useDisclosure,
        Collapse,
        Text } from "@chakra-ui/react"
import Title from '../assets/title.png'
import Title2 from '../assets/title2.png'
import {GiHamburgerMenu} from 'react-icons/gi'
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { FaAngleDown } from "react-icons/fa"
import { getFromLocal } from "../utils/localStorage/getLocalValue"
import { useUserInfo } from "../utils/hooks/user/useUserInfo"
import axios from "axios"
import UserModal from "./user/Modal"




const Navbar = () => {
    const { isOpen, onToggle } = useDisclosure();
    const [openModal,setOpenModal] = useState(false);
    const navigate = useNavigate();
    const [openCategories,setOpenCategories] = useState(false);
    const [token,setToken] = useState(getFromLocal());
    const data = useUserInfo();
    const [user,setUser] = useState(data);

    useEffect(() => {
        setUser(data);
    },[data])
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }

    const openActivities = async() => {
        const options = {
            headers: {
                "Authorization" : "Bearer " + getFromLocal()
            }
        }
        try {
            await axios.put('https://movie-hub-production.up.railway.app/user/disableNotification',{},options);
            navigate("/activities");
        } catch(err) {
            console.log(err);
        }
    }


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
                <Flex direction={"column"} w= {'fit-content'} p = {"1rem"} gap={"1rem"} pl="1.5rem">
                    {!token && <Flex direction = {'column'} gap={"1rem"}>
                        <Text _hover = {{color: "red"}}>
                            <Link to = "/login">Login</Link>
                        </Text>
                        <Text _hover = {{color: "red"}}>
                            <Link to = "/register">Register</Link>
                        </Text>
                    </Flex>}
                    {token && 
                    <>
                        <Flex direction = {'column'} gap={"1rem"}>
                            <Text _hover = {{color: 'red'}} cursor = {'pointer'} onClick = {() => setOpenModal(true)}>Account</Text>
                            <Box _hover = {{color: "red"}} pos ={'relative'}>
                                {user?.notify && <Box pos = {'absolute'} right = {'-3'} w = {'10px'} h = {'10px'} borderRadius = {'50%'} bg = {'red'}></Box>}
                                <Text onClick = {openActivities} cursor={'pointer'}>My activities</Text>
                            </Box>
                            <Text _hover = {{color: "red"}}>
                                <Link to = "/myThreads">My Threads</Link>
                            </Text>
                            <Text cursor = {'pointer'} _hover = {{color: "red"}} onClick = {logout}>
                                Logout
                            </Text>
                        </Flex>
                       <UserModal openModal = {openModal} setOpenModal = {setOpenModal}/>
                    </>
                    }
                    <Flex alignItems={'center'} gap = {'0.2rem'} cursor={'pointer'} bg = {'gray.200'} color = {'red'} fontWeight={'500'} p = {'0.5rem'} borderRadius = {'8px'} onClick={() => setOpenCategories(prev => !prev)}>
                        <Text>Movies</Text>
                        <FaAngleDown />
                    </Flex>
                    <Collapse in = {openCategories}>
                        <Flex direction={"column"} gap={"1rem"}>
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
            </Collapse>
        </Flex>
    )
}

export default Navbar
