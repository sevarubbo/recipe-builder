import Model from '../core/model';

class Ingredient extends Model {}

Ingredient.fields = {
  /**
   * @memberOf Ingredient#
   */
  name: Model.attr(),
  cost: Model.attr(),
  altIngredients: Model.attr()
};

export default Ingredient;
