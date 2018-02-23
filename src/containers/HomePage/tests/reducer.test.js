import { fromJS } from 'immutable';

import homePageReducer from '../reducer';

import {
  loadData,
  loadDataSuccess,
  loadDataError,
  addUser,
  removeUser,
  updateUser,
} from '../actions';

describe('HomePage reducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      error: '',
      loading: false,
      userData: [],
    });
  });


  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homePageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadData action correctly', () => {
    const expectedResult = state
      .set('error', '')
      .set('loading', true);

    expect(homePageReducer(state, loadData())).toEqual(expectedResult);
  });

  it('should handle the loadDataSuccess action correctly', () => {
    const fixture = [{
      id: '123-456-789',
      first: 'Cookie Monster',
    }];

    const expectedResult = state
      .set('userData', fromJS(fixture))
      .set('error', '')
      .set('loading', false);

    expect(homePageReducer(state, loadDataSuccess(fixture))).toEqual(expectedResult);
  });

  it('should handle the loadDataError action correctly', () => {
    const fixture = {
      msg: 'Cant touch this. -MC Hammer',
    };

    const expectedResult = state
      .set('error', fixture)
      .set('loading', false);

    expect(homePageReducer(state, loadDataError(fixture))).toEqual(expectedResult);
  });

  it('should handle the addUser action correctly', () => {
    const fixture = {
      id: 'abc-def-ghi',
      name: 'AlphaMan',
    };

    const expectedResult = state
      .update('userData', list => list.push(fromJS(fixture)));

    expect(homePageReducer(state, addUser(fixture))).toEqual(expectedResult);
  });

  it('should handle the removeUser action correctly', () => {
    const id = 'abc-def';

    const user1 = {
      id,
      first: 'AlphaMan',
    };

    const user2 = {
      id: '123-465',
      first: 'DigitMan',
    };

    const newstate = state
      .update('userData', list => list.push(fromJS(user1)))
      .update('userData', list => list.push(fromJS(user2)));

    const expectedResult = newstate.deleteIn(['userData', 0]);

    expect(homePageReducer(newstate, removeUser(id))).toEqual(expectedResult);
  });

  it('should handle the updateUser action correctly', () => {
    const id = 'abc-def';

    const user = {
      id,
      first: 'BetaMan',
    };

    const user1 = {
      id,
      first: 'AlphaMan',
    };

    const newstate = state
      .update('userData', list => list.push(fromJS(user1)));

    const expectedResult = newstate
      .update('userData', list => list.update(0, item => fromJS(user)));

    expect(homePageReducer(newstate, updateUser(user))).toEqual(expectedResult);
  });
});
