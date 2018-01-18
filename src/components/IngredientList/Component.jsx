import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Ingredient from '../../models/Ingredient';

export default class IngredientList extends React.Component {
  /**
   * Hooks
   */

  /**
   */
  componentWillMount () {
    this.props.fetchIngredients();
  }

  /**
   * @returns {String}
   */
  render () {
    return (
      <section className='ingredient-list'>
        <h1>All ingredients</h1>
        { this.props.ingredients.map(ingredient => (
          <article key={ingredient.id}>
            { ingredient.name } – Cost: { ingredient.cost } - Alternatives: { (ingredient.altIngredients || []).map(id => {
              return this.props.ingredients.find(i => i.id === id).name
          }).join(', ') }
          </article>
        )) }
      </section>
    );
  }
}

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)),

  fetchIngredients: PropTypes.func
};

