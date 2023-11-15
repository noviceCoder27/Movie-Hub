import NowPlaying from "./NowPlaying"
import Popular from "./Popular"
import TopRated from "./TopRated"
import Upcoming from "./Upcoming"

const Movies = () => {   
  

    return (
        <div>
            <div style = {{display : "flex", flexWrap: "wrap",width: "100%", gap: "5rem", justifyContent:"center"}}>
                <h2>Now Playing</h2>
                <NowPlaying />
            </div>
            <div style = {{display : "flex", flexWrap: "wrap",width: "100%", gap: "5rem", justifyContent:"center"}}>
                <h2>Popular</h2>
                <Popular />
            </div>
            <div style = {{display : "flex", flexWrap: "wrap",width: "100%", gap: "5rem", justifyContent:"center"}}>
                <h2>Top Rated</h2>
                <TopRated />
            </div>
            <div style = {{display : "flex", flexWrap: "wrap",width: "100%", gap: "5rem", justifyContent:"center"}}>
                <h2>Upcoming</h2>
                <Upcoming />
            </div>
        </div>
        
  )
}

export default Movies
