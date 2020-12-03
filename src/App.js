import React from 'react'
import AllNotes from './components/AllNotes'
import CreateNote from './components/CreateNote'
import './App.css';

function App() {

    return (
        <React.Fragment>
            <AllNotes/>
            <CreateNote/>
        </React.Fragment>
    );
}

export default App;
