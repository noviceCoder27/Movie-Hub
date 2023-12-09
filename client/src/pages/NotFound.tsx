import { Box,Flex,  Image, Button, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ErrorImage from './../assets/error.png'


const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Box width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Image pos = {'absolute'} src = {ErrorImage} alt = "Error" loading={'lazy'}/>
            <Flex mt = {'30rem'} direction = {'column'} gap = {'2rem'}>
                <Heading >Page Not Found</Heading>
                <Button ml = {'auto'} mr = {'auto'} w= {'80%'} colorScheme="teal" onClick={() => navigate("/")}>
                    Go To Home
                </Button>
            </Flex>
            
        </Box>
    );
};

export default NotFound;