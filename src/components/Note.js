import { useState } from "react";
import { Pencil, CheckLg, Trash3 } from 'react-bootstrap-icons';

const Note = ({nNoteId, title, text, colour, date, appNotes, setAppNotes}) => {
//CONSTANTS
    const [isStar, setIsStar] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [eTitle, setETitle] = useState(title);
    const [eText, setEText] = useState(text);

//METHODS

    const starIndicate = () => {
        if(isStar) return <button></button>;
        return <button></button>
    // TODO:
    // notes star indication function
    }

    const handleEditSubmit = (event) => {
        event.preventDefault();

        let cloneNotes = [...appNotes]

        cloneNotes.map((note) => {
            if(note.noteId === nNoteId) {
                note.title = eTitle;
                note.text = eText;
            }
        })

        console.log(cloneNotes)

        setAppNotes(cloneNotes);
        console.log(appNotes);
        setIsEditing(false);
        console.log('========EDITED!!==============')
    }

    const handleNoteDelete = (event) => {
        event.preventDefault();

        let cloneNotes = [...appNotes];

        cloneNotes = cloneNotes.filter((note) => note.noteId !== nNoteId);
        console.log(nNoteId)
        console.log(cloneNotes);

        setAppNotes(cloneNotes);
    }

    const editToggle = () => {
        if (isEditing) return(
            <form className="note__body" onSubmit={handleEditSubmit}>
                <input
                    type="text"
                    name="title"
                    value={eTitle}
                    onChange={(ev) => setETitle(ev.target.value)}/>

                <input
                    type="text"
                    name="text"
                    value={eText}
                    onChange={(ev) => setEText(ev.target.value)}/>

                <section className="note__footer">
                    <span className="note__date">{date}</span>
                    <section className="note__actions">
                        <button type="submit">
                            <CheckLg/>
                        </button>
                        {/* <input type="submit"></input> */}
                    </section>
                </section>
            </form>
        );

        return(
            <div className="note__body">
                <h1 className="note__title">{title}</h1>
                <span className="note__text">{text}</span>

                <section className="note__footer">
                    <span className="note__date">{date}</span>
                    <section className="note__actions">
                        <button onClick={() => {setIsEditing(true)}}><Pencil/></button>
                        <button onClick={handleNoteDelete}><Trash3/></button>
                    </section>
                </section>
            </div>
        )
    }

    return(
        <div className="note" style={{background:colour}}>
            
            {editToggle()}

        </div>
    )
}

export default Note;