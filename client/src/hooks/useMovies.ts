import { useQuery } from "react-query";
import axios from "axios";


export interface Movie {
    adult: false,
    backdrop_path: string,
    genre_ids: Array<number> | number,
    id: number,
    original_language: string
    original_title: string,
    overview:  string,
    popularity: number
    poster_path: string,
    release_date: number,
    title: string,
    video: boolean
    vote_average: number,
    vote_count: number
}

export const useMovies = (section: string) => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTkyYTljMDc5ODcxNWYxNTY2ODY5NGZkMWU2NGNiNCIsInN1YiI6IjY1M2Y1NjFjYmMyY2IzMDBjOTdmODc2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pk7VRsiKJDVcpeZk2kZnFudewADnOO7wEuALCQLF_zg'
          }
    }
    const fetchMovies = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${section}?language=en-US&page=1`,options);
            return response.data.results;
        } catch(err) {
            throw new Error((err as Error).message)
        }
        
    }
    const {data,error,isLoading,isError} = useQuery<Movie[], Error>(['movies',section],fetchMovies);
    return {data,error,isLoading,isError};
}

// Why section is included in the queryKeys

// the way useQuery caches the results of your API calls. By default, useQuery uses the query key (‘movies’ in your case) to cache the results. This means that when you call useQuery with the same key again, it will return the cached results instead of making a new API call.

// To fix this, you can include the section variable in your query key. This way, useQuery will treat each section as a separate query and cache the results separately