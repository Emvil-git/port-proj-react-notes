import React from 'react';
import { List } from 'react-bootstrap-icons';
import Note from './components/Note';

const {useState} = React;

function App() {
  const date = new Date();
  
  //CONSTANTS
  const initialState = {
      noteId: 0,
      colour: '#8ba4f3',
      title: '',
      text: "Click the Edit Button to edit notes",
      date: date.toString().substr(4,11)
  }

  const [appNotes, setAppNotes] = useState([]);

  console.log(appNotes);

  //METHODS

  

  const handleAddNotes = () => {
    const date = new Date();

    const maxNoteId = appNotes.length;

    const cloneArr = appNotes.map(note => {return note});

    const newNote = {
      noteId: maxNoteId,
      colour: '#8ba4f3',
      title: '',
      text: "Click the Edit Button to edit notes",
      date: date.toString().substr(4,11)
    }

    setAppNotes([...appNotes, {
      noteId: maxNoteId,
      colour: '#8ba4f3',
      title: '',
      text: "Click the Edit Button to edit notes",
      date: date.toString().substr(4,11)
    }])

  }

  const handleEditNote = () => {
    
  }

  return (
    <div className="App">
      <div className="App__toolbar">
        <section>
          <h1>MK Notes</h1>
        </section>

        {/* dynamic search */}
        {/* night mode toggle */}

        <button onClick={handleAddNotes}>Add Note</button>
      </div>
      <div className="App__main">
        {console.log('braces thing run')}
        {console.log(appNotes)}
        {console.log('-------------------')}
        {Object.values(appNotes).map(note => <Note key={note.noteId} nNoteId={note.noteId} colour={note.colour} title={note.title} text={note.text} date={note.date} appNotes={appNotes} setAppNotes={setAppNotes}/>)}
        {/* {appNotes.map(note => <Note key={note.noteId} noteId={note.noteId} colour={note.colour} title={note.title} text={note.text} date={note.date} appNotes={appNotes} setAppNotes={setAppNotes}/>)} */}
      </div>
    </div>
  );
}

export default App;
