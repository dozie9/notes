import React, {useState, useEffect} from 'react';
import {ToastsContainer, ToastsStore} from "react-toasts";
import axios from "axios";

const EditNote = ({match, history}) => {


    const [note, setNote] = useState({});
    const [error, setError] = useState({});
    useEffect(() => {
        const id = match.params.id
        const url = `https://warm-beyond-77036.herokuapp.com/note/${id}/`;
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

    }, [match.params.id])


    const handleSubmit = (e) => {
        e.preventDefault()
        const url = `https://warm-beyond-77036.herokuapp.com/note/${match.params.id}/`;
       /* fetch(url, {
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
        // console.log(note)*/

        axios.put(url, note)
            .then(res => {
                ToastsStore.success(`Your note has been updated`)
                history.push('/')
            })
            .catch(err => {
                if (err.response) {
                    setError(prevState => {
                        return err.response.data
                    })
                }
                console.log(error)
            })
    }

    const handleChange = (e) => {
        let target = e.target
        setNote(prevState => {
            return {...prevState, [target.name]: target.value}
        })
    }

    return (
        <div className={'continer'}>
            <ToastsContainer store={ToastsStore}/>
            <form className={'col-sm-6 needs-validation'} onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input onChange={handleChange} type={'text'} required={true} name={'title'} id={'title'} className="form-control" value={note.title}
                           placeholder="Title"/>
                    <div className="invalid-feedback">
                        {error.title}
                    </div>

                </div>

                <div className="form-group">
                    <label htmlFor="note">Note</label>
                    <textarea className="form-control" required={true} onChange={handleChange} name={'note'} id={'note'} value={note.note} rows="3"/>
                    <div className="invalid-feedback">
                        {error.note}
                    </div>
                </div>
                <button className={'btn btn-primary'}>submit</button>
            </form>
        </div>
    )
}

export default EditNote