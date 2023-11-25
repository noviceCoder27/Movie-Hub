import Navbar from "../../components/Navbar"
import User from "../../components/user/User"
import Movies from "./Movies"

const NowPlaying = () => {
    return (
        <>
            <Navbar />
            <User />
            <Movies category = {'now_playing'}/>
        </>
    )
}

export default NowPlaying
