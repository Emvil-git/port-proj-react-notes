import logo from './logo.svg';
import { useState } from 'react';
import Note from './components/Note';

function App() {
  let maxNoteId = appNotes.length;
  
  //CONSTANTS
  const [appNotes, setAppNotes] = useState([]);

  //METHODS
  // const hasNotes = () => {

  // }
  
  const handleAddNotes = () => {
    const date = new Date();

    appNotes.append(
      {
        noteId: maxNoteId,
        color: '#8ba4f3',
        title: '',
        text: "Click the Edit Button to edit notes",
        date: date.toString().substr(4,11)
      }
    )
  }

  return (
    <div className="App">
      <div className="App__toolbar">
        <section>
          <h1>MK Notes</h1>
        </section>

        {/* dynamic search */}
        {/* night mode toggle */}

        <button>Add Note</button>
      </div>
      <div className="App__main">
        {appNotes.map(note => <Note />)}
        {/* notes here */}
        {/* add notes */}
      </div>
    </div>
  );
}

export default App;
