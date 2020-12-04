import React, {useState} from 'react'

function CreateNote() {
    const [note, setNote] = useState({});
    const url = `https://warm-beyond-77036.herokuapp.com/note/`;


    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(url, {
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
            })
            .catch((error) => {
                console.error('Error:', error)
                return error
            });
        // console.log(note)
    }

    const handleChange = (e) => {
        let target = e.target
        setNote(prevState => {
            return {...prevState, [target.name]: target.value}
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