import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { v4 as uuid } from 'uuid'
import './todoinput.css'    
const Todoinput = () => {
    const [text, setText] = useState('');
    const [data, setData] = useState([]);
    const [page,setPage] = useState(1);
    const setValue = async () => {
        try {
            const data2 = await axios.get(`http://localhost:3778/posts?_limit=4&_page=${page}`);
            setData(data2.data);
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        setValue();
    }, [page]);
    return (
        <>
            <div className="todo-input">
                <div>
                    <input placeholder="Add tasks" type="text" onChange={ (e) => setText(e.target.value)} />
                </div>
                <div>
                    <button onClick={()=> {
                        axios.post("http://localhost:3778/posts", {task : text, status : false, id : uuid()}).then(() =>{
                            setValue();
                        })
                    }} >
                        Save
                    </button>
                </div>
            </div>
            <div className="output-container">
                {data.map((e)=> (
                    <div key={e.id}>
                        <p>{e.task}</p>
                        <p>{!e.status ? "Not Done" : "Done"}</p>
                    </div>
                ))}
            </div>
            <div className="page_div">
                <button onClick={()=> {
                    if(page===1){
                        return;
                    }
                    setPage(page-1) 
                }}>Previous</button>
                <button onClick={()=> {
                    setPage(page+1) 
                }}>Next</button>
            </div>
        </>
    )
}

export default Todoinput