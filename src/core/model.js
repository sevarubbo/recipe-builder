/**
 * @class Model
 */
export default class Model {
  constructor (attributes) {
    Object.keys(attributes).map(attributeName => {
      this[attributeName] = attributes[attributeName];
    });
  }

  /**
   * @param {Model} model
   */
  static register (model) {
    Model.models[model.name] = model;
  }

  /**
   * @param {String} name
   * @return {Model}
   */
  static getModel (name) {
    if (!Model.models[name]) {
      throw `Model "${name}" is not registered`;
    }

    return Model.models[name];
  }
}

Model.models = {};

Model.attr = function () {

};

/**
 * @name id
 * @memberOf Model#
 */
