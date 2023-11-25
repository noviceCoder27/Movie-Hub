import { Box } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import Navbar from "../../components/Navbar"
import User from "../../components/user/User";


const Thread = () => {
    const {threadId} = useParams();
    
    return (
        <Box minH = {'100vh'} bg= {'black'}>
            <Navbar />
            <User />
        </Box>
    )
}

export default Thread
