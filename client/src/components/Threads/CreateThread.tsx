import axios from "axios";
import { useRef, useState } from "react";
import { Button, FormControl, FormLabel, Input, Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getFromLocal } from "../../utils/localStorage/getLocalValue";
import { Thread } from "../../pages/threads/Thread";



interface Props {
    setThreads: React.Dispatch<React.SetStateAction<Thread[] | undefined>>,
    setCreateThread: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean,
    onClose: () => void
}

const CreateThread = ({setThreads,setCreateThread,isOpen,onClose}: Props) => {
    const {movieId} = useParams();
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [thread,setThread] = useState({ 
        title: "",
        description: "",
        movie_id: movieId || ""}); 
    const createThread = async() => {
        const options = {
            headers: {
              Authorization: 'Bearer ' + getFromLocal(),
            },
        }  
        const response = await axios.post('https://movie-hub-production.up.railway.app/user/addThread',thread,options);
        onClose();
        setThreads(prev => prev ? [...prev,response.data]: [response.data]);
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
