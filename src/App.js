import React, { useEffect } from 'react';
import { useTransition, animated, useSpring } from 'react-spring';
import { Plus, Search } from 'react-bootstrap-icons';
import Note from './components/Note';
import { useBEM } from './hooks/useBEM';
import NightModeToggle from './components/NightModeToggle';
import { openDB } from 'idb'; 

const {useState, createContext} = React;

// NIGHT/LIGHT THEME STUFF
export const ThemeContext = createContext(null);

// FOR UNIQUE NOTE ID
let maxId = 1;

const App = () => {
//INITIALIZE NOTE
  const date = new Date();
  
  const initialState = {
      noteId: 0,
      colour: '#8ba4f3',
      title: 'Welcome!',
      text: "Click the + button to add a Note",
      date: date.toString().substr(4,11)
  }

//STATE STUFF
  const [theme, setTheme] = useState("light");
  const [B,E] = useBEM('App')

  const [appNotes, setAppNotes] = useState([initialState]);
  const [search, setSearch] = useState('');
  const [colorAccToggle, setColorAccToggle] = useState(false);

//EFFECTS

  useEffect(() => {
    (async () => {
        const dbName = "Notes_db1"
        const storeName = "store1"
        const version = 1

        await openDB(dbName, version, {
          upgrade(db) {
            db.createObjectStore(storeName, {
              autoIncrement: true,
            })
          }
        })
    })()
  }, []);

//ANIMATION STUFF

  const colorSelectTransition = useTransition(colorAccToggle, {
    from: {width:0},
    enter: {width:139},
    leave: {width:0},
  })

  const noteTransition = useTransition(appNotes, {
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0},
  })

  const nightModeAnim = useSpring({
    background: (theme === "dark") ? "#323739" : "#f9f9fa",
    color: (theme === "dark") ? "#f9f9fa" : "#1d1f20"
  })

  const addColorAnim = useSpring({
    width: colorAccToggle ? '187px' : '48px'
  })

  const themeIconTransition = useSpring({
    transform: "translateY(0)",
    from:{
      transform: "translateY(50rem)"
    },
    leave:{
      transform: "translateY(-50rem)"
    }
  })

  //METHODS
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }
  
  const bTheme = () => {
    if(theme === "dark") return B("dark");
    return B()
  }

  const eTheme = (classStr) => {
    if(theme === "dark") return E(classStr, "dark");
    return E(classStr)
  }

  const dynamicSearch = () => {
    return Object.values(appNotes)
    .filter(note => note.title.toLowerCase().includes(search.toLowerCase()) || note.text.toLowerCase().includes(search.toLowerCase()))
    .map(note => 
    <Note key={note.noteId} note={note} appNotes={appNotes} setAppNotes={setAppNotes}/>)
    // .map(note => 
    // <Note key={note.noteId} nNoteId={note.noteId} colour={note.colour} title={note.title} text={note.text} date={note.date} appNotes={appNotes} setAppNotes={setAppNotes}/>)
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

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <animated.div className={B()} style={nightModeAnim}>
      <div className={E('toolbar')}>
        <section>
          <h1 className={E('title')}>MK Notes</h1>
        </section>

        <section>
          <section className={eTheme('search-cont')}>
            <Search className={E('search-icon')}/>
            <input
            className={eTheme('dyna-search')}
            placeholder='Search'
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
            />
          </section>
        </section>

        <section className={E('add-supercont')}>
          
          <animated.div style={addColorAnim} className={eTheme('add-cont')}>
            <button className={E('add-btn')} onClick={() => setColorAccToggle(!colorAccToggle)}>
              <Plus className={eTheme('add-icon')}/>
            </button>
            {colorSelectTransition((style, item) => 
            
            item ? <animated.section style ={style} className={E('color-select')}>
              <button className={E('color-btn--blue')} value={"blue"} onClick={(ev) => handleAddNotes(ev)}></button>
              <button className={E('color-btn--red')} value={"red"} onClick={(ev) => handleAddNotes(ev)}></button>
              <button className={E('color-btn--yellow')} value={"yellow"} onClick={(ev) => handleAddNotes(ev)}></button>
              <button className={E('color-btn--green')} value={"green"} onClick={(ev) => handleAddNotes(ev)}></button>
            </animated.section> : ''

            )}
          </animated.div>

          <NightModeToggle theme={theme} toggleTheme={toggleTheme}/>
        </section>

      </div>
      <div className={E('main')}>
        {dynamicSearch()}
      </div>
    </animated.div>
    </ThemeContext.Provider>
  );
}

export default App;
