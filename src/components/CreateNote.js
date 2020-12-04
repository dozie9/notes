import React, {useState} from 'react'
import {ToastsContainer, ToastsStore} from 'react-toasts'
import axios from 'axios'

function CreateNote({history}) {
    const [note, setNote] = useState({});
    const [error, setError] = useState({});
    const url = `https://warm-beyond-77036.herokuapp.com/note/`;


    const handleSubmit = (e) => {
        e.preventDefault()
        /*fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note),
        })
            .then(response => {
                if (response.status >= 200 && response.status <= 299) {
                    return response.json()
                } else {
                    throw new Error(response.statusText)
                }
            })
            .then(data => {
                console.log('Success:', data)
                ToastsStore.success(`Your note has been added`)
                history.push('/')
            })
            .catch((error) => {
                console.error('Error:', error)
                return error
            });
        // console.log(note)*/
        axios.post(url, note)
            .then(res => {
                ToastsStore.success(`Your note has been added`)
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

        // console.log(note)

    }

    return (
        <div className={'continer'}>
            <ToastsContainer store={ToastsStore}/>
            <form className={'col-sm-6 needs-validation'} onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input onChange={handleChange} type={'text'} required={true} name={'title'} id={'title'} className="form-control" aria-describedby="emailHelp"
                           placeholder="Title"/>
                    <div className="invalid-feedback">
                        {error.title}
                    </div>

                </div>

                <div className="form-group">
                    <label htmlFor="note">Note</label>
                    <textarea className="form-control" required={true} onChange={handleChange} name={'note'} id={'note'} rows="3"/>
                    <div className="invalid-feedback">
                        {error.note}
                    </div>
                </div>
                <button className={'btn btn-primary'}>submit</button>
            </form>
        </div>
    )
}

export default CreateNote;