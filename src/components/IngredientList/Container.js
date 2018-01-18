import {connect} from 'react-redux';
import Component from './Component';
import {fetchAllEntities} from '../../actions/async/entity';
import {getEntities} from '../../getters/entity';

/**
 * @return {Object}
 */
function mapStateToProps (state) {
  return {
    ingredients: getEntities(state, 'ingredient')
  };
}

/**
 * @param {Function} dispatch
 * @return {Object.<Function>}
 */
function mapDispatchToProps (dispatch) {
  return {
    fetchIngredients () {
      dispatch(fetchAllEntities('ingredient'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
