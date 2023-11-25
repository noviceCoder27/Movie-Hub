import Navbar from "../../components/Navbar";
import User from "../../components/user/User";
import Movies from "./Movies";


const TopRated = () => {
    return (
        <>
            <Navbar />
            <User />
            <Movies category = {'top_rated'}/>
        </>
       
    )
}

export default TopRated
