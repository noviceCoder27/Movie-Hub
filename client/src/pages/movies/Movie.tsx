import { Box } from '@chakra-ui/react';
import MovieContent from './MovieContent';
import { useState } from 'react';
import Threads from '../../components/threads/Threads';
import Navbar from '../../components/Navbar';


const Movie = () => {
    const [openThreads,setOpenThreads] = useState(false);
    return (
        <Box>
            <Navbar />
            {openThreads ? 
            <Threads /> 
            :
            <Box bg ='black' pos = {'relative'}>
                <MovieContent setOpenThreads = {setOpenThreads}/>
            </Box>
            }
        </Box>
    )
}

export default Movie
