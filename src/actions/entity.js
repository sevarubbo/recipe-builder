/**
 * @param {String} entityType
 * @param {Object} attributes
 * @returns {Function}
 */
export function pushEntity (entityType, attributes) {
  return function (dispatch) {
    return dispatch({
      type: 'PUSH_ENTITY',
      entityType,
      attributes
    });
  };
}

/**
 * @param {String} entityType
 * @param {String} entityId
 * @returns {Function}
 */
export function deleteEntity (entityType, entityId) {
  return function (dispatch) {
    return dispatch({
      type: 'DELETE_ENTITY',
      entityType,
      id: entityId
    });
  };
}
