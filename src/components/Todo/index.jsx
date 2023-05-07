import { React, useState } from "react";
import Button from '@mui/material/Button';
import "./style.css";
import { FaRegTrashAlt } from "react-icons/fa";


function Todo() {

    const [value, setValue] = useState("")
    const [tasks, setTasks] = useState([])

    const Change = (e) => {
        setValue(e.target.value)
    }
    const adToList = (e) => {
        e.preventDefault();
        if (value !== "") {
            setTasks([...tasks, value]);
        }
        else {
            alert("bos ola bilmez")
        }
        setValue("")
    }

    const delet = (id) => {
        const removeItem = tasks.filter((task) => {
            return task.id === id;
        });
        setTasks(removeItem);
        // const newDelet  = tasks.map((tas) =>{
        //     return tas !== text 
        // });
        // setTasks(newDelet);
        // tasks.map((ta) =>(
        //     ta
        // ))
    }


    return (
        <>
            <div className="container">
                <div className="parent">
                    <form action="" className="btn" onSubmit={adToList}>
                        <input type="text" onChange={Change} value={value} />
                        <Button variant="contained" onClick={adToList}>Contained</Button>
                    </form>

                    <div className="list">

                        <ul>
                            {tasks.map((task) => (
                                <li> {task}  <button onClick={delet}><FaRegTrashAlt className="icon" /></button></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo