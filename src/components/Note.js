import { useState } from "react";
import { PencilFill, CheckLg, Trash3Fill } from 'react-bootstrap-icons';
import { useBEM } from "../hooks/useBEM";
import dbMethods from '../methods/dbMethods';

const { dbGetNotes, dbDelNote, dbUpdateNote } = dbMethods;

const Note = ({note, appNotes, setAppNotes}) => {
//CONSTANTS
    const [B,E] = useBEM('note');

    const {noteId, colour, title, text, date} = note;

    const [isEditing, setIsEditing] = useState(false);
    const [eTitle, setETitle] = useState(title);
    const [eText, setEText] = useState(text);

//METHODS
    const handleEditSubmit = async (event) => {
        event.preventDefault();

        await dbUpdateNote(noteId, eTitle, eText);

        setAppNotes(await dbGetNotes());
        setIsEditing(false);
    }

    const handleNoteDelete = async (event) => {
        event.preventDefault();

        await dbDelNote(noteId);

        setAppNotes(await dbGetNotes());
    }

    const charsIndicator = () => {
        let charsLen = eText.length;
        let charsStr = charsLen + "/140"
        return charsStr;
    }

    const titleTooLong = () => {
        let titleDisp = '';

        (title.length > 25) ? titleDisp = title.substring(0,21) + '...' : titleDisp = title;
        
        return titleDisp;
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

                <textarea
                    maxLength={140}
                    name="text"
                    value={eText}
                    onChange={(ev) => setEText(ev.target.value)}
                    className={E('text--editing')} />

                <section className={E('footer')} >
                    <span className={E('date')}>{charsIndicator()}</span>
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
                <h1 className={E('title')}>{titleTooLong()}</h1>
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