import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom'

const EditNote = ({match, history}) => {


    const [note, setNote] = useState({});
    useEffect(() => {
        const url = `https://warm-beyond-77036.herokuapp.com/note/${match.params.id}/`;
        fetch(url)
            .then(response => {
                if (response.status >= 200 && response.status <= 299) {

                    return response.json()
                } else {
                    throw new Error(response.json())
                }
            })
            .then((data) => {

                setNote(prevState => {
                    return data
                });

            })

    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        const url = `https://warm-beyond-77036.herokuapp.com/note/${match.params.id}/`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note),
        })
            .then(response => response.json())
            .then(data => {

                history.push('/')
            })
            .catch((error) => {
                console.error('Error:', error)
            });
        // console.log(note)
    }

    const handleChange = (e) => {
        let target = e.target
        setNote(prevState => {
            return {...prevState, [target.name]: target.value}
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Title: <input onChange={handleChange} type={'text'} name={'title'} value={note.title} id={'title'}/>
                </label>
                <label>
                    Note: <textarea onChange={handleChange} name={'note'} value={note.note} id={'note'}/>
                </label>
                <button>submit</button>
            </form>
        </div>
    )
}

export default EditNote