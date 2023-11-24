import Navbar from "../../components/Navbar"
import Movies from "./Movies"

const NowPlaying = () => {
    return (
        <>
            <Navbar />
            <Movies category = {'now_playing'}/>
        </>
    )
}

export default NowPlaying
