import React from 'react';
import ReactDOM from 'react-dom';

import {
  addUser,
  removeUser,
  updateUser,
  loadData,
  loadDataSuccess,
  loadDataError,
} from '../actions';

import {
  ADD_USER,
  REMOVE_USER,
  UPDATE_USER,
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
} from '../constants';

describe('HomePage Actions', () => {
  it('addUser action has a type of ADD_USER and correct payload', () => {
    const user = 'Tommy Tutone';
    const expected = {
      type: ADD_USER,
      user,
    };

    expect(addUser(user)).toEqual(expected);
  });

  it('removeUser action has a type of REMOVE_USER and correct payload', () => {
    const id = '876-5309';
    const expected = {
      type: REMOVE_USER,
      id,
    };

    expect(removeUser(id)).toEqual(expected);
  });

  it('updateUser action has a type of UPDATE_USER and correct payload', () => {
    const user = 'Jenny';
    const expected = {
      type: UPDATE_USER,
      user,
    };

    expect(updateUser(user)).toEqual(expected);
  });

  it('loadData action has a type of LOAD_DATA and correct payload', () => {
    const expected = {
      type: LOAD_DATA,
    };

    expect(loadData()).toEqual(expected);
  });

  it('loadDataSuccess action has a type of LOAD_DATA_SUCCESS and correct payload', () => {
    const users = [{
      id: '31415926',
      first: 'Archimedes of',
      last: 'Syracuse',
      address: 'Egypt',
    }];

    const expected = {
      type: LOAD_DATA_SUCCESS,
      users,
    };

    expect(loadDataSuccess(users)).toEqual(expected);
  });

  it('loadDataError action has a type of LOAD_DATA_ERROR and correct payload', () => {
    const error = 'It\'s a feature, not a bug';

    const expected = {
      type: LOAD_DATA_ERROR,
      error,
    };

    expect(loadDataError(error)).toEqual(expected);
  });
});
