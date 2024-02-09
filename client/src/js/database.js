import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const contactDb = await openDB('jate', 1);
  const transaction = contactDb.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Data saved', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const contactDb = await openDB('jate', 1);
  const transaction = contactDb.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('Data retrieved', result);
  
  return result?.value;
};

initdb();
