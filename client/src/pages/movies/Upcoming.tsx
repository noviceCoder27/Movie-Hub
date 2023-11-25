import Navbar from "../../components/Navbar"
import User from "../../components/user/User"
import Movies from "./Movies"

const Upcoming = () => {
    
    return (
        <>
            <Navbar />
            <User />
            <Movies category = {'upcoming'}/>
        </>
    )
}

export default Upcoming
