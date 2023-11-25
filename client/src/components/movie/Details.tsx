import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react"
import { IMovie,ICast } from "../../utils/hooks/useMovieInfo"
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";


interface Genre {
    id: string,
    name: string
}

interface Props {
    movie: IMovie | undefined,
    cast: ICast[] | undefined,
}

const Details = ({movie,cast}: Props) => {

    const displayCastMembers = cast?.map(actor => (
        <Flex direction = {'column'} flexWrap = {'wrap'}alignItems = {'center'} key = {actor.id} gap={'0.5rem'}>
            <Flex flexWrap={'wrap'} >
                {actor?.profile_path ? 
                <Image src = {`https://image.tmdb.org/t/p/original/${actor?.profile_path}`} alt="Actor image" maxH = {'100px'}height={'12vh'} width={'8vw'} maxW={'100px'} minH={'50px'} minW={'50px'} borderRadius={'50%'}/>
                :
                <Box >
                    <FaRegUserCircle style = {{fontSize: "550%"}}/>
                </Box>}
            </Flex>
            <span>{actor.name}</span>
        </Flex>
    ));
   
    const genres = movie?.genres.map(genre => (
        <Box border={'2px solid white'} key = {(genre as Genre).id} p= {'0.5rem 1rem'} borderRadius={'20px'}>
            {(genre as Genre).name}
        </Box>
    ))

    return (
        <Flex pos = {'relative'} zIndex = {'2'} gap = {'4rem'} direction={{base: "column", lg: "row"}} alignItems={{base: 'center',lg: 'start'}}>
            <Box  borderRadius={'12px'}>
                <Image src= {`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} boxShadow={'0px 7px 29px 0px rgba(100, 100, 111, 0.2)'} alt="Movie Image" height={'500px'} width={'500px'} borderRadius={'12px'}/>
            </Box>
            <Flex direction = {'column'} gap = {'1.2rem'} width={'fit-content'}>
                <Heading>{movie?.original_title}</Heading>
                <Flex gap={'1rem'}>
                    {genres}
                </Flex>
                <Text width={{base: "100%", lg: '70%'}}>{movie?.overview}</Text>
                <Flex gap={'2rem'} mt = {'2rem'} flexWrap={'wrap'} justifyContent={{base:'center',md:'start'}}>
                    {displayCastMembers}
                </Flex>
                <Text mt = {'2rem'} mb = {'0.1rem'}>Join the discussions for this movie</Text>
                <Button width={'fit-content'} bg = 'transparent' color = 'white' border = '2px solid white' _hover = {{color: "black", background: "white"}}>
                    <Link to = 'threads'>View Threads</Link>
                    
                </Button>
            </Flex>
        </Flex>
    )
}

export default Details
