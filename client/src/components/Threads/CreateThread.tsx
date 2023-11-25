import axios from "axios";
import { Thread } from './Threads';
import { useRef, useState } from "react";
import { Button, FormControl, FormLabel, Input, Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";


interface Props {
    setThreads: React.Dispatch<React.SetStateAction<Thread[] | null>>,
    setCreateThread: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean,
    onClose: () => void
}

const CreateThread = ({setThreads,setCreateThread,isOpen,onClose}: Props) => {
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [thread,setThread] = useState<Thread>({ 
        _id: 4,
        title: "",
        description: "",
        userName: "mugdha",
        time: "5:32PM",
        movieId: "299054"}) 
    const createThread = async() => {
        // const options = {
        //     headers: {
        //       Authorization: 'Bearer ' + localStorage.getItem("token"),
        //     },
        // }  
        // const response = await axios.post('http://localhost:3000/user/addThread',thread,options);
        // console.log(response);
        onClose();
        setThreads(prev=> {
            if(prev) {
                return [...prev,thread];
            }
            return [thread];
        });

    }

    const close = () => {
        setCreateThread(false);
        onClose();
    }

    return (
            <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent bg = {'black'} color = {'white'} boxShadow={'0px 2px 12px 0px #484848'} p ={'2rem'}>
                    <ModalHeader>Create a thread</ModalHeader>
                    <FormControl>
                        <FormLabel>Title:</FormLabel>
                        <Input onChange={(e) =>setThread(prev => ({...prev,title: e.target.value}))} ref={initialRef} placeholder='title' />
                    </FormControl>
                    <FormControl mt = {'1rem'}>
                        <FormLabel>Description:</FormLabel>
                        <Input onChange={(e) =>setThread(prev => ({...prev,description: e.target.value}))} placeholder='description' />
                    </FormControl>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={createThread}> Create </Button>
                        <Button onClick={close}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
        </Modal> 
    )
}

export default CreateThread
