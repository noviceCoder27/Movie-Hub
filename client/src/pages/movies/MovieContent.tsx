import {useParams} from 'react-router-dom'
import { useMovieInfo } from '../../utils/hooks/movies/useMovieInfo'
import { Box,CircularProgress,Flex,Heading, Image, Text } from '@chakra-ui/react';
import Videos from '../../components/movie/Videos';
import Details from '../../components/movie/Details';
import Similar from '../../components/movie/Similar';


const MovieContent = () => {
    const {movieId} = useParams();
    let movie,cast,videos;
    const {data,isLoading,isError,error} = useMovieInfo(movieId);
    if(isLoading) {
        return (
            <Flex h = {'100vh'} alignItems = {'center'} justifyContent={'center'} bg = {'black'}>
                <CircularProgress isIndeterminate color='red.300' size={'50%'} mt = {'5rem'} position={'absolute'} left = {'43%'}/>
            </Flex>
        )
    }
    if(isError) {
        return (
            <div>Error loading data: {error?.message}</div>
        )
    }
    if(data) {
        [movie,cast,videos] = data;
    }
    return (
        <Box pt = {{lg: "12rem"}} color = {'white'} p = {'3rem'}>
            <Image opacity = {'30%'} left = {'0'} top = {'0'}pos = {'absolute'} src = {`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} h = {'25%'} w = {'100%'}/>
            <Details movie = {movie} cast = {cast}/>
            <Flex direction={'column'} gap = {'2rem'} mt ={'4rem'}>
                <Heading>Promos & Trailers</Heading>
                {videos && videos.length ? 
                <Videos videos = {videos}/>: 
                <Text mb= {'2rem'} color = {'gray'}>Nothing to display ...</Text>
                }
            </Flex>
            <Flex>
                {movieId && <Similar movieId = {movieId}/>}
            </Flex>
        </Box>
    )
}

export default MovieContent
