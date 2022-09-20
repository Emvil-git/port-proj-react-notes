export const dbConfig = {
    name: "Notes_db1",
    version: 7,
    objectStoresMeta: [
        {
            storeName: "notesStore",
            storeConfig: {keyPath: 'noteId'}
        },
        {
            storeName: "appStore",
            storeConfig: {},
        }
    ]
}
