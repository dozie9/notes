import React, {useState, useEffect} from 'react'

function NoteDetail({match}) {
    const url = `https://warm-beyond-77036.herokuapp.com/note/`;
    const [note, setNote] = useState({});

    useEffect(() => {
        fetch(url+match.params.id)
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


    return (
        <>
            <h1>{note.title}</h1>
            <div>{note.note}</div>
        </>
    )

}

export default NoteDetail