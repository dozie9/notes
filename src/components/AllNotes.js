import React, {useState} from 'react'


function AllNotes() {
    const [notes, setNote] = useState([]);
    const url = `https://warm-beyond-77036.herokuapp.com/note/`;

    fetch(url)
        .then(response => response.json())
        .then((data) => {
            setNote(data);
            // console.log(notes)
        })
    return (
        <div>

            <table border="solid">
                <tbody>
                <tr><th>Title</th><th>Note</th></tr>
                {notes.map(item => (
                <tr>
                    <td>{item.title}</td>
                    <td>{item.note}</td>

                </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllNotes;