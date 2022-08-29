import { useState } from "react";
import { PencilFill, CheckLg, Trash3Fill } from 'react-bootstrap-icons';
import { useBEM } from "../hooks/useBEM";

const Note = ({nNoteId, title, text, colour, date, appNotes, setAppNotes}) => {
//CONSTANTS
    const [B,E] = useBEM('note');

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
            <form className={E('body')} onSubmit={handleEditSubmit}>
                <input
                    type="text"
                    name="title"
                    value={eTitle}
                    onChange={(ev) => setETitle(ev.target.value)}
                    className={E('title--editing')} />

                <input
                    type="text"
                    name="text"
                    value={eText}
                    onChange={(ev) => setEText(ev.target.value)}
                    className={E('text--editing')} />

                <section className={E('footer')} >
                    <span className={E('date')}>{date}</span>
                    <section className={E('actions')}>
                        <button type="submit" className={E('action-btn')}>
                            <CheckLg className={E('btn-icon')}/>
                        </button>
                    </section>
                </section>
            </form>
        );

        return(
            <div className={E('body')}>
                <h1 className={E('title')}>{title}</h1>
                <p className={E('text')}>{text}</p>

                <section className={E('footer')}>
                    <span className={E('date')}>{date}</span>
                    <section className={E('actions')}>
                        <button className={E('action-btn')} onClick={() => {setIsEditing(true)}}><PencilFill className={E('btn-icon')}/></button>
                        <button className={E('action-btn')} onClick={handleNoteDelete}><Trash3Fill className={E('btn-icon')}/></button>
                    </section>
                </section>
            </div>
        )
    }

    return(
        <div className={B()} style={{background:colour}}>
            
            {editToggle()}

        </div>
    )
}

export default Note;