import React, {useState, useEffect, useCallback} from 'react'
import {Link} from "react-router-dom";
import {ToastsContainer, ToastsStore} from 'react-toasts'


function AllNotes() {
    const [notes, setNote] = useState([]);

    const fetchNotes = useCallback(() => {
        const url = `https://warm-beyond-77036.herokuapp.com/note/`;
        fetch(url)
            .then(response => {
                if (response.status >= 200 && response.status <= 299) {
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

    useEffect(() => {
        fetchNotes()
    }, [fetchNotes])

    const handleDelete = (e) => {
        console.log(e.target.value)
        const url = `https://warm-beyond-77036.herokuapp.com/note/${e.target.value}/`;
        fetch(url, {
            method: 'DELETE',
        })
            .then(response => {
                console.log(response)
                response.text()
            })
            .then(data => {
                // console.log(data)
                fetchNotes()
                ToastsStore.error(`note was deleted`)
            })
            .catch((error) => {
                console.error('Error:', error)
            });

    }

    return (
        <div className={'container'}>
            <ToastsContainer store={ToastsStore}/>

            <table className={'table'}>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Note</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {notes.map(item => (
                    <tr key={item.id}>
                        <td><Link to={`/note/${item.id}`}>{item.title}</Link></td>
                        <td>{item.note}</td>
                        <td><Link to={`/note/edit/${item.id}`}>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-fill"
                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                            </svg>
                        </Link></td>
                        <td>
                            <button className={'btn btn-danger'} onClick={handleDelete} value={item.id}>
                                delete
                            </button>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllNotes;