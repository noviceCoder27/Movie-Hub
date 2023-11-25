import Navbar from "../../components/Navbar";
import User from "../../components/user/User";
import Movies from "./Movies";




const Popular = () => {
    return (
        <>
        <Navbar />
        <User />
        <Movies category = {'popular'}/>
    </>
    )
}


export default Popular
