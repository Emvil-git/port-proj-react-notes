export const dbConfig = {
    name: "Notes_db1",
    version: 5,
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
