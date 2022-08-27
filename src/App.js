import React from 'react';
import { PlusLg } from 'react-bootstrap-icons';
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
  const [colorAccToggle, setColorAccToggle] = useState(false);

  console.log(appNotes);

  //METHODS
  const dynamicSearch = () => {
    return Object.values(appNotes)
    .filter(note => note.title.toLowerCase().includes(search.toLowerCase()) || note.text.toLowerCase().includes(search.toLowerCase()))
    .map(note => <Note key={note.noteId} nNoteId={note.noteId} colour={note.colour} title={note.title} text={note.text} date={note.date} appNotes={appNotes} setAppNotes={setAppNotes}/>)
  }

  const handleAddNotes = (ev) => {
    ev.preventDefault();

    const date = new Date();

    maxId++;

    let addColour = "";

    switch(ev.target.value) {
      case "blue" :
        addColour = "#8ba4f3";
        break;
      case "red" :
        addColour = "#f06767";
        break;
      case "yellow" :
        addColour = "#eded68";
        break;
      case "green" :
        addColour = "#73e17d";
        break;
    }

    setAppNotes([...appNotes, {
      noteId: maxId,
      colour: addColour,
      title: '',
      text: "Click the Edit Button to edit notes",
      date: date.toString().substr(4,11)
    }])

    setColorAccToggle(false);

  }

  const colorSelect = () => {
    if(colorAccToggle) {
      return(
        <section className="App__color-select">
          <button className="App__color-btn--blue" value={"blue"} onClick={(ev) => handleAddNotes(ev)}></button>
          <button className="App__color-btn--red" value={"red"} onClick={(ev) => handleAddNotes(ev)}></button>
          <button className="App__color-btn--yellow" value={"yellow"} onClick={(ev) => handleAddNotes(ev)}></button>
          <button className="App__color-btn--green" value={"green"} onClick={(ev) => handleAddNotes(ev)}></button>
        </section>
      )
    }
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

        <div className="App_add-btn">
          <button onClick={() => setColorAccToggle(!colorAccToggle)}>
            <PlusLg/>
          </button>
          {colorSelect()}
        </div>

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
