import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Ingredient from '../../models/Ingredient';

export default class IngredientCreator extends React.Component {
  /**
   *
   */
  constructor () {
    super(...arguments);

    this.state = {
      newAttributes: {
        name: '',
        cost: 2,
        altIngredients: []
      }
    };
  }

  /**
   * Hooks
   */

  /**
   */
  componentWillMount () {
    this.props.fetchIngredients();
  }

  /**
   * @param {Object} e
   */
  onNameChange (e) {
    this.setState({
      newAttributes: {
        ...this.state.newAttributes,
        name: e.target.value
      }
    });
  }

  /**
   * @param e
   */
  onCostChange (e) {
    this.setState({
      newAttributes: {
        ...this.state.newAttributes,
        cost: +e.target.value
      }
    });
  }

  /**
   * @param e
   */
  onAltIngredientsChange (e) {
    this.setState({
      newAttributes: {
        ...this.state.newAttributes,
        altIngredients: [...e.target.options].filter(o => o.selected).map(o => +o.value)
      }
    });
  }

  /**
   * Methods
   */

  /**
   *
   */
  createIngredient () {
    this.props.createIngredient({
      ...this.state.newAttributes
    });

    this.setState({
      newAttributes: {
        name: '',
        cost: 2,
        altIngredients: []
      }
    });
  }

  /**
   * @returns {String}
   */
  render () {
    return (
      <section className='ingredient-creator'>
        <h1>Add an ingredient</h1>

        <form onSubmit={(e) => {e.preventDefault(); this.createIngredient();}}>
          <label>
            Name:&nbsp;
            <input
              type='text'
              required={true}
              name='ingredient-name'
              value={this.state.newAttributes.name}
              onChange={e => this.onNameChange(e)}
            />
          </label>
          <br />
          <label>
            Cost:&nbsp;
            <input type='radio' name='ingredient-cost' value={1}
              checked={this.state.newAttributes.cost === 1}
             onChange={e => this.onCostChange(e)}
            />
            <input type='radio' name='ingredient-cost' value={2} checked={this.state.newAttributes.cost === 2}
                   onChange={e => this.onCostChange(e)} />
            <input type='radio' name='ingredient-cost' value={3} checked={this.state.newAttributes.cost === 3}
                   onChange={e => this.onCostChange(e)} />
          </label>
          <br />
          <label>
            Alternatives:&nbsp;
            <select value={this.state.newAttributes.altIngredients} multiple={true}
              onChange={e => this.onAltIngredientsChange(e)}
            >
              { this.props.ingredients.map(ingredient => (
                <option key={ingredient.id} value={ingredient.id}>{ ingredient.name }</option>
              )) }
            </select>
          </label>
          <button>Add</button>
        </form>
      </section>
    );
  }
}

IngredientCreator.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)),

  fetchIngredients: PropTypes.func,
  createIngredient: PropTypes.func
};

