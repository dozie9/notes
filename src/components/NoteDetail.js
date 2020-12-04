import React, {useState, useEffect} from 'react'

function NoteDetail({match}) {
    const [note, setNote] = useState({});

    useEffect(() => {
        const url = `https://warm-beyond-77036.herokuapp.com/note/`;
        const id = match.params.id
        fetch(url+id)
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
    }, [match.params.id])


    return (
        <>
            <h1>{note.title}</h1>
            <div>{note.note}</div>
        </>
    )

}

export default NoteDetail