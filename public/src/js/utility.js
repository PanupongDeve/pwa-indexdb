var dbPromise = idb.open('feed-store', 1, (db) => {
    if (!db.objectStoreNames.contains('posts')) {
      db.createObjectStore('posts', { keyPath: 'id' });
    }
});

const writeData = (storeName, data) => {
    return dbPromise
        .then((db) => {
            let tx = db.transaction(storeName, 'readwrite');
            let store = tx.objectStore(storeName);
            store.put(data);
            return tx.complete;
        });
}

const readAllData = (storeName) => {
    return dbPromise
        .then((db) => {
            let tx = db.transaction(storeName, 'readonly');
            let store = tx.objectStore(storeName);
            return store.getAll();
        });
}

const clearAllData = (storeName) => {
    return dbPromise
        .then((db) => {
            let tx = db.transaction(storeName, 'readwrite');
            let store = tx.objectStore(storeName);
            store.clear();
            return tx.complete;
        });
}

const deleteItemFromData = (storeName, id) => {
    return dbPromise
        .then((db) => {
            let tx = db.transaction(storeName, 'readwrite');
            let store = tx.objectStore(storeName);
            console.log('key', id);
            store.delete(id);
            return tx.complete;
        })
        .then(() => {
            console.log('Item Deleted!');
        });
}