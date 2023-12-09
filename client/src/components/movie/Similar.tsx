import { Box, Flex, Heading, Image, Skeleton, Text } from "@chakra-ui/react";
import { useSimilarMovies } from "../../utils/hooks/movies/useSimilarMovies"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from "react-router-dom";


interface Props {
    movieId: string
}

const Similar = ({movieId}:Props) => {


    const {data,error,isLoading,isError} = useSimilarMovies(movieId);
    const arr = [0,0,0,0,0,0];
    const displaySkeleton = arr.map((_,index) => (
        <Skeleton key = {index} w = {'200px'} h = {'300px'} borderRadius = {'12px'} />
    ))

    if(isLoading) {
        return (
            <Flex gap = {'1.5rem'}>
                {displaySkeleton}
            </Flex>
        )
    }
    if(isError) {
        return (
            <div>Error loading data: {error?.message}</div>
        )
    }


    const displaySimilarMovies = data?.map((movie,index) => (
        <Box key = {index} >
            {movie.poster_path && 
            <SwiperSlide key = {index}>
                <Link to = {`/movies/${movie.id}`}>
                    <Flex direction = {'column'} gap = {'1.2rem'} p = {'1rem'}>
                        <Image src = {`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} h = {'300px'} w = {'250px'} boxShadow={'0px 7px 29px 0px rgba(100, 100, 111, 0.2)'} borderRadius={'12px'} alt = "Movie Image"  cursor = {'pointer'} _hover = {{transform: "scale(1.1)"}}/>
                        <Text _hover = {{color: "red"}}>{movie.original_title}</Text>
                    </Flex>
                </Link>
            </SwiperSlide>}
        </Box>       
    ))
    
    return (
        <Box>
            <Heading>Related Movies</Heading>
            <Box mt = {'3rem'} maxW={{base: '80vw', md: "90vw"}}>
                <Swiper
                spaceBetween={10}
                scrollbar={{ draggable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                      },

                      1024: {
                        slidesPerView: 5,
                        spaceBetween: 40,
                      },
                      
                      1268: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                      },
                }}
                >
                    {displaySimilarMovies}
                </Swiper>
            </Box>
        </Box>
    )
}

export default Similar
