import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { AspectRatio, Box } from '@chakra-ui/react';
import { IVideos } from '../../utils/hooks/movies/useMovieInfo';

interface Props {
    videos: IVideos[] | undefined
}

const Videos = ({videos}: Props) => {
    
    const displayVideos = videos?.map(videoObj => (
        <SwiperSlide key = {videoObj.id}>
            <AspectRatio w= {'30vw'} h = {'30vh'} maxW = {'420px'} minW= {'300px'} minH = {'300px'} mb = {'3rem'}>
                <iframe src={`https://www.youtube.com/embed/${videoObj.key}`}></iframe>
            </AspectRatio  >
        </SwiperSlide>
    ));
    return (
        <Box>
            <Swiper
            spaceBetween={10}
            scrollbar={{ draggable: true }}
            breakpoints={{
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                800: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                1024: {
                slidesPerView: 3,
                spaceBetween: 20,
                },

                1750: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },    
            }}
            >
                {displayVideos}
            </Swiper>
        </Box>
        
    )
    
}

export default Videos