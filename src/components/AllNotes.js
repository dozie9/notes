import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";


function AllNotes() {
    const [notes, setNote] = useState([]);

    useEffect(() => {
        fetch(url)
        .then(response => {
            if (response.status >= 200 && response.status <= 299){
                return response.json()
            } else {
                throw new Error(response.json())
            }
        })
        .then((data) => {
            setNote(data);
            // console.log(notes)
        })
    }, [])
    const url = `https://warm-beyond-77036.herokuapp.com/note/`;

    const handleDelete = (e) => {
        // console.log(e.target.value)
        fetch(url + e.target.value, {
            method: 'DELETE',
        })
            .then(response => {
                console.log(response)
                response.text()
            })
            .then(data => {
                console.log(data)
            })
            .catch((error) => {
                console.error('Error:', error)
            });

    }

    return (
        <div>

            <table border="solid">
                <tbody>
                <tr><th>Title</th><th>Note</th><th></th></tr>
                {notes.map(item => (
                <tr key={item.id}>
                    <td><Link to={`/note/${item.id}`}>{item.title}</Link></td>
                    <td>{item.note}</td>
                    <td><Link to={`/note/edit/${item.id}`}>edit</Link></td>
                    <td><button onClick={handleDelete} value={item.id}>delete</button></td>

                </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllNotes;