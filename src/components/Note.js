import { useState } from "react";

//CONSTANTS
const [isStar, setIsStar] = useState(false);
const [isEditing, setIsEditing] = useState(false);

//METHODS

const starIndicate = () => {
    if(isStar) return <button></button>;
    return <button></button>
    // TODO:
    // notes star indication function
}

const Note = ({noteId, title, text, colour, date}) => {
    return(
        <div className="note">
            <section className="note__header">
                <h1 className="note__title">{title}</h1>
                {starIndicate()}
            </section>
            <p className="note__text">{text}</p>
            <section className="note__footer">
                <span className="note__date">{date}</span>
                <section className="note__actions">
                    <button className="note__btn">Edit</button>
                    <button className="note__btn">Delete</button>
                </section>
            </section>
        </div>
    )
}

export default Note;