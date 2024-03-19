import  {
        Modal,
        ModalOverlay,
        ModalContent,
        ModalHeader,
        FormLabel,
        Input,
        ModalFooter,
        Flex,
        Box,
        Button,
        Image,
        useDisclosure} from '@chakra-ui/react'
import { useRef, useState } from 'react';
import { getFromLocal } from '../../utils/localStorage/getLocalValue';
import axios from 'axios';

interface Props {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const UserModal = ({openModal,setOpenModal}: Props) => {
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const { onClose } = useDisclosure();
    const [userDetails,setUserDetails] = useState({userName: '', email: '',profilePicture: ''});
    const [border,setBorder] = useState({0: false, 1: false});
    const maleImg = 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png'
    const femaleImg = 'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png';
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
            setOpenModal(false);
        } catch(err) {
            console.log(err)
        }
    } 

    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen = {openModal}
            onClose = {onClose}
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
                        <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
    )
}

export default UserModal
