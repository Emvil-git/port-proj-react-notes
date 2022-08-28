import React from 'react';
import { Plus, Search, MoonFill } from 'react-bootstrap-icons';
import Note from './components/Note';
import { useBEM } from './hooks/useBEM';

const {useState, createContext} = React;

// NIGHT/LIGHT THEME STUFF
export const ThemeContext = createContext(null);

// FOR UNIQUE NOTE ID
let maxId = 1;

function App() {
//INITIALIZE NOTE
  const date = new Date();
  
  const initialState = {
      noteId: 0,
      colour: '#8ba4f3',
      title: 'Welcome!',
      text: "Click the + button to add a Note",
      date: date.toString().substr(4,11)
  }

//CONSTANTS
  const [theme, setTheme] = useState("light");
  const [B,E] = useBEM('App')

  const [appNotes, setAppNotes] = useState([initialState]);
  const [search, setSearch] = useState('');
  const [colorAccToggle, setColorAccToggle] = useState(false);

  console.log(appNotes);

  //METHODS
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }
  
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
      title: 'New Note',
      text: "Click the ✏️ Button to edit notes",
      date: date.toString().substr(4,11)
    }])

    setColorAccToggle(false);

  }

  const colorSelect = () => {
    if(colorAccToggle) {
      return(
        <section className={E('color-select')}>
          <button className={E('color-btn--blue')} value={"blue"} onClick={(ev) => handleAddNotes(ev)}></button>
          <button className={E('color-btn--red')} value={"red"} onClick={(ev) => handleAddNotes(ev)}></button>
          <button className={E('color-btn--yellow')} value={"yellow"} onClick={(ev) => handleAddNotes(ev)}></button>
          <button className={E('color-btn--green')} value={"green"} onClick={(ev) => handleAddNotes(ev)}></button>
        </section>
      )
    }
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div className={B()}>
      <div className={E('toolbar')}>
        <section>
          <h1 className={E('title')}>MK Notes</h1>
        </section>

        <section>
          <section className={E('search-cont')}>
            <Search className={E('search-icon')}/>
            <input
            className={E('dyna-search')}
            placeholder='Search'
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
            />
          </section>
        </section>

        <section className={E('add-supercont')}>
          <div className={E('add-cont')}>
            <button className={E('add-btn')} onClick={() => setColorAccToggle(!colorAccToggle)}>
              <Plus className={E('add-icon')}/>
            </button>
            {colorSelect()}
          </div>

          <button className={E('theme-btn')}>
            <MoonFill className={E('theme-icon')}/>
          </button>
        </section>

        {/* night mode toggle */}

      </div>
      <div className={E('main')}>
        {dynamicSearch()}
      </div>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
