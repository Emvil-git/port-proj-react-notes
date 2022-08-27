import React from 'react';
import { List } from 'react-bootstrap-icons';
import Note from './components/Note';

const {useState} = React;

let maxId = 1;

function App() {
//INITIALIZE NOTE
  const date = new Date();
  
  const initialState = {
      noteId: 0,
      colour: '#8ba4f3',
      title: 'Welcome!',
      text: "Click the Add Note button to add a Note",
      date: date.toString().substr(4,11)
  }

//CONSTANTS
  const [appNotes, setAppNotes] = useState([initialState]);
  const [search, setSearch] = useState('');

  console.log(appNotes);

  //METHODS
  const dynamicSearch = () => {
    return Object.values(appNotes)
    .filter(note => note.title.toLowerCase().includes(search.toLowerCase()) || note.text.toLowerCase().includes(search.toLowerCase()))
    .map(note => <Note key={note.noteId} nNoteId={note.noteId} colour={note.colour} title={note.title} text={note.text} date={note.date} appNotes={appNotes} setAppNotes={setAppNotes}/>)
  }

  const handleAddNotes = () => {
    const date = new Date();

    maxId++;

    setAppNotes([...appNotes, {
      noteId: maxId,
      colour: '#8ba4f3',
      title: '',
      text: "Click the Edit Button to edit notes",
      date: date.toString().substr(4,11)
    }])

  }

  return (
    <div className="App">
      <div className="App__toolbar">
        <section>
          <h1 className="App__title">MK Notes</h1>
        </section>

        <input
        placeholder='Search'
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
        />


        {/* dynamic search */}
        {/* night mode toggle */}

        <button onClick={handleAddNotes}>Add Note</button>
      </div>
      <div className="App__main">
        {console.log('ALLNOTES:')}
        {console.log(appNotes)}
        {console.log('-------------------')}
        {console.log('FILTERED NOTES:')}
        {console.log(dynamicSearch())}
        {dynamicSearch()}
      </div>
    </div>
  );
}

export default App;
