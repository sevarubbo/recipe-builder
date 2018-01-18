import {openDB} from './db';
import {snakeCase} from 'lodash';

/**
 * @param {String} entityType
 * @return {String}
 */
function getObjectStoreNameFromEntityType (entityType) {
  return snakeCase(entityType);
}

export const API = {
  /**
   * @param {String} entityType
   * @param {Object} attributes
   * @return {Promise.<Object>}
   */
  createOne (entityType, attributes) {
    const storeName = getObjectStoreNameFromEntityType(entityType);

    return openDB().then(db => {
      const transaction = db.transaction(storeName, 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.add(attributes);

      return new Promise(resolve => {
        request.onsuccess = () => {
          this.getOne(entityType, request.result).then(resolve);
        };
      });
    });
  },

  /**
   * @param {String} entityType
   * @param {String} entityId
   * @return {Promise.<Object>}
   */
  getOne (entityType, entityId) {
    const storeName = getObjectStoreNameFromEntityType(entityType);

    return openDB().then(db => {
      const transaction = db.transaction(storeName, 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.get(entityId);

      return new Promise(resolve => {
        request.onsuccess = () => {
          resolve(request.result);
        };
      });
    });
  },

  /**
   * @param {String} entityType
   * @return {Promise.<Array.<Object>>}
   */
  getAll (entityType) {
    const storeName = getObjectStoreNameFromEntityType(entityType);

    return openDB(storeName).then(db => {
      const transaction = db.transaction(storeName, 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.getAll();

      return new Promise(resolve => {
        request.onsuccess = () => {
          resolve(request.result);
        };
      });
    });
  },

  /**
   * @param {String} entityType
   * @param {String} entityId
   * @param {Object} attributes
   * @return {Promise.<Object>}
   */
  updateOne (entityType, entityId, attributes) {
    const storeName = getObjectStoreNameFromEntityType(entityType);

    return this.getOne(entityType, entityId).then(result => {
      return openDB().then(db => [result, db]);
    }).then(([result, db]) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const objectStore = transaction.objectStore(storeName);

      Object.keys(attributes).forEach(attribute => {
        result[attribute] = attributes[attribute];
      });

      const request = objectStore.put(result);

      return new Promise(resolve => {
        request.onsuccess = () => {
          this.getOne(entityType, request.result).then(resolve);
        };
      });
    });
  },

  /**
   * @param {String} entityType
   * @param {String} entityId
   * @return {Promise.<Array.<Object>>}
   */
  deleteOne (entityType, entityId) {
    const storeName = getObjectStoreNameFromEntityType(entityType);

    return openDB().then(db => {
      const transaction = db.transaction(storeName, 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.delete(entityId);

      return new Promise(resolve => {
        request.onsuccess = () => {
          resolve(request.result);
        };
      });
    });
  }
};
