import { Box } from '@chakra-ui/react';
import MovieContent from './MovieContent';
import Navbar from '../../components/Navbar';
import User from '../../components/user/User';


const Movie = () => {
    return (
        <Box bg= 'black' >
            <Navbar />
            <User />
            <Box bg ='black' pos = {'relative'}>
                <MovieContent />
            </Box>
        </Box>
    )
}

export default Movie
