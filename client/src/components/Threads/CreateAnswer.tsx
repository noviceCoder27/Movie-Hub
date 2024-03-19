import { 
    Button, 
    FormControl, 
    Modal, 
    ModalBody, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Textarea } from "@chakra-ui/react"
import axios from "axios"
import { useRef } from "react"
import { AnswerValues } from "../../pages/threads/Thread";
import { getFromLocal } from "../../utils/localStorage/getLocalValue";
import {  useSetRecoilState } from "recoil";
import { threadState } from "../../store/atoms/thread";

interface Props {
    answer: AnswerValues,
    setAnswer:  React.Dispatch<React.SetStateAction<AnswerValues>>,
    isOpen: boolean,
    threadId: string | undefined,
    onClose: () => void,
}

const CreateAnswer = ({isOpen,onClose,threadId,answer,setAnswer}:Props) => {
    const setThread = useSetRecoilState(threadState);
    const generateAns = async () => {
        const options = {
            headers: {
                Authorization: "Bearer " + getFromLocal()
            }
        }
        const response = await axios.post(`https://movie-hub-lqtp.onrender.com/user/addAnswer`,answer,options);
        setAnswer({thread_id: threadId,content: "",answer_id: null});
        setThread(response.data);
        onClose();
    }
    const generateComment = async () => {
        const options = {
            headers: {
                Authorization: "Bearer " + getFromLocal()
            }
        }
        const response = await axios.post(`https://movie-hub-lqtp.onrender.com/user/addComment`,answer,options);
        setAnswer({thread_id: threadId,content: "",answer_id: null});
        setThread(response.data);
        onClose();
    }
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Write your answer here</ModalHeader>
            <ModalBody pb={2}>
                <FormControl mt={2}>
                <Textarea h= {'150'}placeholder='Description' onChange = {(e) => setAnswer(prev => ({...prev,content: e.target.value}))}></Textarea>
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={answer.answer_id === null? generateAns : generateComment}>
                Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreateAnswer
