import { openDB } from 'idb'; 
import { dbConfig } from "../dbConfig";

const { name, version, objectStoresMeta } = dbConfig;
const { storeName } = objectStoresMeta[0];
const aStoreName = objectStoresMeta[1].storeName;

const dbAddNote = async (nuNote) => {
    const db = await openDB(name, version);
    await db.add(storeName , nuNote);
}

const dbGetNotes = async () => {
    const db = await openDB(name, version);
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const res = await store.getAll().then(res => {return res});
    await tx.done;

    return res;
}

const dbDelNote = async (noteId) => {
    const db = await openDB(name, version);
    const tx = db.transaction(storeName, 'readwrite');

    let cursor = await tx.store.openCursor();

    while (cursor.key <= noteId) {
        if (cursor.key === noteId) {
            cursor.delete();
            break;
        }
        cursor = await cursor.continue();
    }

    await tx.done;
}

const dbUpdateNote = async (noteId, noteTitle, noteText) => {
    const db = await openDB(name, version);
    const tx = db.transaction(storeName, 'readwrite');

    let cursor = await tx.store.openCursor();

    while (cursor.key <= noteId) {

        const note = {...cursor.value};

        if (cursor.key === noteId) {
            note.title = noteTitle;
            note.text = noteText;
            cursor.update(note);
            break;
        }

        cursor = await cursor.continue();
    }

    await tx.done;
}

const dbGetAppStatus = async () => {
    const db = await openDB(name, version);
    const tx = db.transaction(aStoreName, 'readwrite');
    const store = tx.objectStore(aStoreName);

    const res = await store.getAll().then(res => {return res});
    await tx.done;

    return res;
}

const dbInitAppStatus = async () => {
    const initAppStatus = {
        firstRodeo: true,
        idCount: 1,
        theme: 'light',
    }

    const db = openDB(name, version);
    await db.add(aStoreName, initAppStatus);
}

const dbUpdateSettings = async (arg) => {
    const db = openDB(name, version);

    const tx = db.transaction(aStoreName, 'readwrite');

    let cursor = await tx.store.openCursor();

    // switch (true) {
    //     case (typeof arg === 'boolean')
    // }

    // while (cursor) {

    //     const settings = {...cursor.value};
        
    //     settings.firstRodeo = false;
    //     cursor.update(note);
    //     break;

    //     cursor = await cursor.continue();
    // }
}


export default { dbAddNote, dbGetNotes, dbDelNote, dbUpdateNote };