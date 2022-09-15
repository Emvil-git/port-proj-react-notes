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

const dbDelNote = async (noteId) => {
    const db = await openDB(name, version);

    const tx = db.transaction(storeName, 'readwrite');
    const index = tx.store.index('noteId');

    for await (const cursor of index.iterate()) {
      const article = { ...cursor.value };
      article.body += ' And, happy new year!';
      cursor.update(article);
    }

    await tx.done;
}

export default { dbAddNote, dbGetNotes };