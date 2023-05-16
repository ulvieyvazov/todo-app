import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {

    const [data, setData] = useState([])
    const [state, setState] = useState({
        username: "",
        password: ""
    })

    const [userId, setUserId] = useState("")



    const getData = async () => {
        const res = await axios.get("http://localhost:3000/users");
        setData(res.data)
    }

    const deletData = async (id) => {
        await axios.delete(`http://localhost:3000/users/${id}`);
        getData()
    }
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const onPost = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3000/users", {
            username: state.username,
            password: state.password
        })
        await getData()
    }

    const editClick = (ud) => {
        setState({
            username: ud.username,
            password: ud.password
        });
        setUserId(ud._id)
    }

    const updateData = async () => {
        await axios.put(`http://localhost:3000/users/${userId}`, state)
        await getData()
        
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            <form action="" onSubmit={onPost}>
                <label htmlFor="">username</label>
                <input type="text" name='username' onChange={handleChange} value={state.username} />
                <label htmlFor="">password</label>
                <input type="text" name='password' onChange={handleChange} value={state.password} />
                <button>add</button>
            </form>
            <button onClick={updateData}>update</button>

            {
                data.map((d) => (
                    <div key={d._id}>
                        <h1>{d.username}</h1>
                        <button onClick={() => deletData(d._id)}>delet</button>
                        <button onClick={() => editClick(d)}>edit</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Home
