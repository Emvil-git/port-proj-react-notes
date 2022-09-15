export const dbConfig = {
    name: "Notes_db1",
    version: 4,
    objectStoresMeta: [
        {
            storeName: "notesStore",
            storeConfig: {keyPath: 'noteId'}
        }
    ]
}