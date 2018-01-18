const dbName = 'recipe-cms';

/**
 * @return {Promise.<IDBDatabase>}
 */
export function openDB () {
  return new Promise(resolve => {
    const DBRequest = indexedDB.open(dbName, 1);

    DBRequest.onsuccess = function () {
      resolve(DBRequest.result);
    };

    DBRequest.onerror = function () {
      throw new Error('Database error');
    };

    DBRequest.onupgradeneeded = function (event) {
      /** @type {IDBDatabase} */
      const db = DBRequest.result;

      if (event.oldVersion < 1) {
        db.createObjectStore('ingredient', {
          keyPath: 'id',
          autoIncrement: true
        });

        db.createObjectStore('step', {
          keyPath: 'id',
          autoIncrement: true
        });

        db.createObjectStore('recipe', {
          keyPath: 'id',
          autoIncrement: true
        });
      }
    };
  });
}

