import axios from "axios";


interface Thread {
    title: string,
    description: string,
    movie_id: string | undefined
}
interface Props {
    thread: Thread
    setThread: React.Dispatch<React.SetStateAction<Thread>>
}

const CreateThread = ({thread,setThread}: Props) => {
    const createThread = async() => {
        const options = {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
        }  
        const response = await axios.post('http://localhost:3000/user/addThread',thread,options);
        console.log(response);
    }

    return (
        <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id = "title" onChange={(e) =>setThread(prev => ({...prev,title: e.target.value}))}/>
            <label htmlFor="description">Description:</label>
            <input type="text" id = "description" onChange={(e) =>setThread(prev => ({...prev,description: e.target.value}))}/>
            <button onClick={createThread}>Create</button> 
        </div>
    )
}

export default CreateThread
