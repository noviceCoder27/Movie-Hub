import { Box, Flex, Heading, Image, Skeleton, SkeletonText, Text } from "@chakra-ui/react";
import { useMovies } from "../../utils/hooks/movies/useMovies";
import { Link } from "react-router-dom";
import Background from '../../assets/bg.svg'
import Pagination from "../../components/Pagination";
import { useState } from "react";
import SearchBox from "../../components/SearchBox";
import { useMovie } from "../../utils/hooks/movies/useMovie";


interface Props {
    category: string
}

const Movies = ({category}: Props) => {
    const [page,setPage] = useState(1);
    const [movieName,setMovieName] = useState("");
    const {data,error,isLoading,isError} = useMovies(category,page);
    const movieResults = useMovie(movieName);
    const arr = [0,0,0,0,0];
    const skeleton = arr.map((_,index)  => (
        <Box mt = {{md: "8rem"}} key = {index} maxW={"200px"} h = {'320px'} bgColor={"black"}>
            <Skeleton marginBottom={"1rem"} height = {'200px'} width = {'200px'}>
            </Skeleton>
            <Box padding={'1rem'} >
                <SkeletonText width={'90%'} height={'8px'} borderRadius={'8px'}></SkeletonText>
            </Box>
        </Box>
    ))
    if(isLoading) {
        return (
            <Flex  minH = {'100vh'} flexWrap={"wrap"} gap = {"2rem"} padding = {"2rem"} position={'relative'} backgroundImage={Background} backgroundRepeat={"no-repeat"} backgroundSize={"cover"} justifyContent={{base: "center",md: "start"}}>
               {skeleton}
            </Flex>
        )
    }

    if(isError) {
        return (
            <Box>
                <Text mt = {{md: "8rem"}}>Error loading data: {error?.message}</Text>
            </Box>
        )
    }   

    
    const allMovies = data?.filter((_,index) => index < data.length-1)
    const displayMovies = ((movieResults && movieResults.length) ? movieResults : allMovies)?.map(movie => (
        <Box key = {movie.id} maxW={"200px"} bgColor={"black"} _hover={{transform: "scale(1.1)"}} boxShadow={"0px 7px 29px 0px black"}>
            <Box marginBottom={"1rem"} >
                <Image src= {`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt="Movie Image" height={'200px'} width={'200px'} loading="lazy"/>
            </Box>
            <Text color = "white" padding={'1rem'} _hover={{color: "red"}}>
                <Link to = {`/movies/${movie.id}`}>{movie.original_title}</Link>
            </Text>
        </Box>
    ))
    
    return (
        <Flex direction = {"column"} backgroundImage={Background} backgroundRepeat={"no-repeat"} backgroundSize={"cover"}>
            <Heading mt = {{lg: "6rem"}} color = {"white"} pl = {"2rem"} pt = {"2rem"} textShadow={"0px 7px 0px black"}>{category?.toUpperCase() + "..."}</Heading>
            <Box ml = {'auto'} mr = {'auto'} w = {'50%'} my = {'2rem'}>
                <SearchBox setMovieName = {setMovieName}/>
            </Box>
            <Flex flexWrap={"wrap"} gap = {"2rem"} p = {"2rem"} justifyContent={{base: "center",md: "start"}}>
                {displayMovies}                 
            </Flex>
            {data && <Flex ml={"auto"} mr = {"auto"}>
                <Pagination page = {page} setPage = {setPage} totalPages = {data[data.length-1] as unknown as number}/>
            </Flex>}
        </Flex>
    )
}

export default Movies