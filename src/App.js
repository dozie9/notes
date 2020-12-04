import React from 'react'
import AllNotes from './components/AllNotes'
import CreateNote from './components/CreateNote'
import Nav from './components/Nav'
import NoteDetail from './components/NoteDetail'
import EditNote from './components/EditNote'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {

    return (
        <>

            <Router>
                <Nav/>
                <Switch>
                    <Route path={'/'} exact component={AllNotes}/>
                    <Route path={'/create'} exact component={CreateNote}/>
                    <Route exact path={'/note/:id'} component={NoteDetail}/>
                    <Route exact path={'/note/edit/:id'} component={EditNote}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
