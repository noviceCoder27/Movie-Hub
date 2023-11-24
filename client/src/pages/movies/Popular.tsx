import Navbar from "../../components/Navbar";
import Movies from "./Movies";




const Popular = () => {
    return (
        <>
        <Navbar />
        <Movies category = {'popular'}/>
    </>
    )
}


export default Popular
