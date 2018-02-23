/*
 * Reducer
 */

import { fromJS } from 'immutable';

import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
  ADD_USER,
  REMOVE_USER,
  UPDATE_USER,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  error: '',
  loading: false,
  userData: [],
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return state
        .set('error', '')
        .set('loading', true);

    case LOAD_DATA_SUCCESS:
      return state
        .set('error', '')
        .set('loading', false)
        .setIn(['userData'], fromJS(action.users));

    case LOAD_DATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);

    case ADD_USER:
      return state
        .update('userData', list => list.push(fromJS(action.user)));

    case UPDATE_USER: {
      const userIndex = state.get('userData').findIndex(user => user.get('id') === action.user.id);
      return state
        .update('userData', list => list.update(userIndex, user => fromJS(action.user)));
    }

    case REMOVE_USER: {
      const userIndex = state.get('userData').findIndex(user => user.get('id') === action.id);
      return state
        .deleteIn(['userData', userIndex]);
    }

    default:
      return state;
  }
}

export default homePageReducer;
