import React, {useState} from 'react'

function CreateNote() {
    const [note, setNote] = useState({});
    const url = `https://warm-beyond-77036.herokuapp.com/note/`;



    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(note)
    }

    const handleChange = (e) => {
        let target = e.target
        setNote({
            [target.name]: target.value
        })
        console.log(note)

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Title: <input onChange={handleChange} type={'text'} name={'title'} id={'title'}/>
                </label>
                <label>
                    Note: <textarea onChange={handleChange} name={'note'} id={'note'}/>
                </label>
                <button>submit</button>
            </form>
        </div>
    )
}

export default CreateNote;