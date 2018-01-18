import {API} from '../../api';
import {deleteEntity, pushEntity} from '../entity';

/**
 * @param {String} entityType
 * @param {Object} attributes
 * @return {Function}
 */
export function createOneEntity (entityType, attributes) {
  return function (dispatch) {
    API.createOne(entityType, attributes).then(attributes => {
      dispatch(pushEntity(entityType, attributes));
    });
  };
}

/**
 * @param {String} entityType
 * @returns {Function}
 */
export function fetchAllEntities (entityType) {
  return function (dispatch) {
    API.getAll(entityType).then(entities => {
      entities.forEach(attributes => {
        dispatch(pushEntity(entityType, attributes));
      });
    });
  };
}

/**
 * @param {String} entityType
 * @param {String} entityId
 * @param {Object} attributes
 */
export function updateOneEntity (entityType, entityId, attributes) {
  return function (dispatch) {
    API.updateOne(entityType, entityId, attributes).then(result => {
      dispatch(pushEntity(entityType, result));
    });
  };
}

/**
 *
 * @param {String} entityType
 * @param {String} entityId
 * @return {Function}
 */
export function deleteOneEntity (entityType, entityId) {
  return function (dispatch) {
    API.deleteOne(entityType, entityId).then(() => {
      dispatch(deleteEntity(entityType, entityId));
    });
  };
}
