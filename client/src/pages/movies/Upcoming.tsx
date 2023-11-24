import Navbar from "../../components/Navbar"
import Movies from "./Movies"

const Upcoming = () => {
    
    return (
        <>
            <Navbar />
            <Movies category = {'upcoming'}/>
        </>
    )
}

export default Upcoming
