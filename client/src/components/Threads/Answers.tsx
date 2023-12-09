import { Flex } from "@chakra-ui/react"
import Answer from "./Answer"
import { AnswerValues, Discussion } from "../../pages/threads/Thread";


interface Props {
    discussion_box: Discussion,
    setAnswer:  React.Dispatch<React.SetStateAction<AnswerValues>>,
    onOpen: () => void
}

const Answers = ({onOpen,setAnswer,discussion_box}: Props) => {
    let displayAnswers;
    if(discussion_box) {
        const {answers} = discussion_box;
        displayAnswers = answers.map(answer => (
            <Answer 
            id = {String(answer.answer_id)}
            key = {answer.answer_id} 
            onOpen = {onOpen} 
            content = {answer.content} 
            likes = {answer.likes}
            dislikes = {answer.dislikes}
            userName = {answer.user_name}
            createdAt = {answer.createdAt}
            setAnswer = {setAnswer}
            answerId = {answer.answer_id}
            comments = {answer.comments}
            />
        )) 
    }
    return (
        <Flex direction = {'column'} mt= {"2rem"} gap = {'2rem'} pb = {'2rem'}>
            {displayAnswers}
        </Flex>
    )
}

export default Answers
