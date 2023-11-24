import axios from "axios";
import { useQuery } from "react-query";




export interface IMovie {   
    adult: boolean
    backdrop_path: string
    belongs_to_collection: object
    budget: number
    genres: Array<object>
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    production_companies: Array<object>
    production_countries: Array<object>
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: Array<object>
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    poster_path: string
}

export interface ICast {
    adult: boolean
    cast_id: number
    character: string
    credit_id: string
    gender: number
    id: number
    known_for_department: string
    name: string
    order: number
    original_name: string
    popularity: number
    profile_path: string
}

export interface IVideos {
    id: string
    iso_639_1: string
    iso_3166_1: string
    key: string
    name: string
    official: boolean
    published_at: string
    site: string
    size: number
    type: string
}


export const useMovieInfo = (movieId: string | undefined) => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTkyYTljMDc5ODcxNWYxNTY2ODY5NGZkMWU2NGNiNCIsInN1YiI6IjY1M2Y1NjFjYmMyY2IzMDBjOTdmODc2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pk7VRsiKJDVcpeZk2kZnFudewADnOO7wEuALCQLF_zg'
          }
    }
    const fetchMovieInfo = async () => {
        try {
            const movie = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,options);
            const movieData: IMovie = movie.data;
            const members = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,options);
            const allCast: Array<ICast> = members.data.cast;
            const filteredCast = allCast.filter((_,index) => index<=4);
            const movieVids = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,options);
            const videoResults: Array<IVideos> = movieVids.data.results;
            return [movieData,filteredCast,videoResults] as  [IMovie, ICast[], IVideos[]];
        } catch(err) {
            throw new Error((err as Error).message);
        } 
    }
    const {data,isLoading,isError,error} = useQuery<[IMovie,Array<ICast>,Array<IVideos>],Error>(['movie',movieId],fetchMovieInfo);
    return {data,isLoading,isError,error};
}


