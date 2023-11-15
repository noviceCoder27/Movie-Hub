import {useParams} from 'react-router-dom'
import { useMovieInfo } from '../hooks/useMovieInfo'


interface Genre {
    id: string,
    name: string
}


const Movie = () => {
    const {movieId} = useParams();
    let movie,cast,videos;
    const {data,isLoading,isError,error} = useMovieInfo(movieId);
    if(isLoading) {
        return (
            <div>Loading...</div>
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
    
    const displayCastMembers = cast?.map(actor => (
        <div key = {actor.id}>
            <div>
                <img src = {`https://image.tmdb.org/t/p/original/${actor?.profile_path}`} alt="Actor image" height={'200px'} width={'200px'}/>
            </div>
            <span>{actor.name}</span>
        </div>
    ));
    const displayVideos = videos?.map(videoObj => (
        <div key = {videoObj.id}>
            <iframe width="420" height="315" src={`https://www.youtube.com/embed/${videoObj.key}`}></iframe>
        </div>
    ));

    const genres = movie?.genres.map(genre => (
        <>
            {(genre as Genre).name}
        </>
    ))
        
    return (
        <div>
            <div>
                <img src= {`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt="Movie Image" height={'500px'} width={'500px'}/>
            </div>
            <h1>{movie?.original_title}</h1>
            <div>
                {genres}
            </div>
            <p>{movie?.overview}</p>
            <div>
                {displayCastMembers}
            </div>
            <div>
                {displayVideos}
            </div>
        </div>
    )
}

export default Movie
