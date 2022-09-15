import { openDB } from 'idb'; 
import { dbConfig } from "../dbConfig";

const { name, version, objectStoresMeta } = dbConfig;
const { storeName, storeConfig } = objectStoresMeta[0];

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

    console.log('===|RESULTS|=============================');
    console.log(res);
    return res;
}

export default { dbAddNote, dbGetNotes };