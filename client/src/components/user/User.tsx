import { 
        Flex,
        Image,
        Modal,
        ModalContent,
        ModalOverlay,
        ModalHeader,
        ModalFooter,
        FormLabel,
        Input,
        Popover,
        PopoverBody,
        PopoverContent,
        PopoverTrigger,
        Text, 
        useDisclosure,
        Button,
        Box} from "@chakra-ui/react"
import UserImg from './../../assets/user.png'
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from 'react';
import { getFromLocal } from "../../utils/localStorage/getLocalValue";
import axios from "axios";
import { useUserInfo } from "../../utils/hooks/user/useUserInfo";

const User = () => {
    const navigate = useNavigate();
    const [token,setToken] = useState(getFromLocal());    
    const [userDetails,setUserDetails] = useState({userName: '', email: '',profilePicture: ''});
    const [border,setBorder] = useState({0: false, 1: false});
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const {isOpen,onOpen,onClose} = useDisclosure();
    const maleImg = 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png'
    const femaleImg = 'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png';
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

    const selectImage = (src:string,num: 0 | 1) => {
        const notNum = num === 0 ? 1 : 0;
        const borderObj = {[notNum]: false,[num]: true} as {0: boolean, 1: boolean};
        setBorder(borderObj);
        setUserDetails(prev => ({...prev,profilePicture: src}));
    }

    const updateCred = async() => {
        const options = {
            headers: {
                Authorization: "Bearer " + getFromLocal()
            }
        }
        try {
            await axios.put('https://movie-hub-lqtp.onrender.com/user/updateUserCredentials',userDetails,options);
            onClose();
        } catch(err) {
            console.log(err)
        }
    } 

    const openActivities = async() => {
        const options = {
            headers: {
                "Authorization" : "Bearer " + getFromLocal()
            }
        }
        try {
            await axios.put('https://movie-hub-lqtp.onrender.com/user/disableNotification',{},options);
            navigate("/activities");
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <Popover placement= {'bottom-end'} closeOnBlur = {false}>
            <PopoverTrigger>
                <Flex 
                cursor = {'pointer'}
                pos = {'absolute'} 
                display={{base: "none", lg: "flex"}} 
                h= {'12vh'} 
                minH = {'50px'} 
                maxH = {'70px'} left = {'2rem'} 
                zIndex = {"4"} 
                top = {'2rem'} 
                bg = {'white'} 
                borderRadius={'50%'} 
                p = {'1rem'} 
                border = {'4px solid black'}>
                    <Image w= {'100%'} src = {UserImg} alt = "User Icon" />
                </Flex>
            </PopoverTrigger>
           {!token && <PopoverContent>
                <PopoverBody>
                    <Text _hover = {{color: 'red'}}><Link to = "/register">Register</Link></Text>
                </PopoverBody>
                <PopoverBody>
                    <Text _hover = {{color: 'red'}}><Link to = "/login">Login</Link></Text>
                </PopoverBody>
            </PopoverContent>}
            {token && 
            <>
                <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent bg = {'black'} color = {'white'} boxShadow={'0px 2px 12px 0px #484848'} p ={'2rem'}>
                        <ModalHeader>Update your details</ModalHeader>
                        <Flex justify={'center'} gap = {'1rem'}>
                            <Box w = {'30%'} cursor = {'pointer'}  onClick = {() => selectImage(maleImg,0)}>
                                <Image src = {maleImg} alt = "Male profile" border = {border["0"] ?'2px solid blue': ''} borderRadius={'50%'}/>
                            </Box>
                            <Box w = {'31%'} cursor={'pointer'} onClick = {() => selectImage(femaleImg,1)}>
                                <Image src = {femaleImg} alt = "Female profile" border = {border["1"] ?'2px solid blue': ''} borderRadius={'50%'} />
                            </Box>
                        </Flex>
                        <FormLabel htmlFor="userName">User name:</FormLabel>
                        <Input type="text" id = "userName" onChange={(e) => setUserDetails(prev => ({...prev,userName: e.target.value}))}/>
                        <FormLabel mt = {'1rem'} htmlFor="email">Email:</FormLabel>
                        <Input type="text" id = "email" onChange={(e) => setUserDetails(prev => ({...prev,email: e.target.value}))}/>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick = {updateCred}> Update</Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <PopoverContent>
                <PopoverBody>
                    <Text _hover = {{color: 'red'}} cursor = {'pointer'} onClick = {onOpen}>Account</Text>
                </PopoverBody>
                <PopoverBody>
                <Box _hover = {{color: "red"}} pos ={'relative'}>
                    {user?.notify && <Box pos = {'absolute'} right = {'-3'} w = {'10px'} h = {'10px'} borderRadius = {'50%'} bg = {'red'}></Box>}
                    <Text onClick = {openActivities} cursor={'pointer'}>My activities</Text>
                </Box>
                </PopoverBody>
                <PopoverBody>
                    <Text _hover = {{color: 'red'}}><Link to = "/myThreads">My Threads</Link></Text>
                </PopoverBody>
                <PopoverBody>
                   <Text cursor = {'pointer'} _hover = {{color: 'red'}} onClick = {logout}>Logout</Text>
                </PopoverBody>
            </PopoverContent> 
        </>}
        </Popover>
    )
}

export default User
