import { useState } from "react";
import { PencilFill, CheckLg, Trash3Fill } from 'react-bootstrap-icons';
import { useBEM } from "../hooks/useBEM";

const Note = ({note, appNotes, setAppNotes}) => {
//CONSTANTS
    const [B,E] = useBEM('note');

    const {noteId, colour, title, text, date} = note;

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
            if(note.noteId === noteId) {
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

        cloneNotes = cloneNotes.filter((note) => note.noteId !== noteId);
        console.log(noteId)
        console.log(cloneNotes);

        setAppNotes(cloneNotes);
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

    const getLnHt = () => {
        const noteThing = document.querySelector('.note');
        const txtThing = document.querySelector('.note__text');

        console.log('----------------')

        console.log(noteId)

        if(noteThing.clientHeight !== null){
            console.log('note height')
            console.log(noteThing.clientHeight);
        }  

        if(txtThing.clientHeight !== null){
            console.log('text ln height')
            console.log(txtThing.clientHeight);
        }     

        console.log('----------------')
    }


    return(
        <div className={B()} style={{background:colour}}>
            
            {editToggle()}

            {/* {getLnHt()} */}
        </div>
    )
}

export default Note;