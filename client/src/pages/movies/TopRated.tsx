import Navbar from "../../components/Navbar";
import Movies from "./Movies";


const TopRated = () => {
    return (
        <>
            <Navbar />
            <Movies category = {'top_rated'}/>
        </>
       
    )
}

export default TopRated
