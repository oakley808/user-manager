/*
 * Actions
 */

import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
  ADD_USER,
  REMOVE_USER,
  UPDATE_USER,
} from './constants';

export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export function removeUser(id) {
  return {
    type: REMOVE_USER,
    id,
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user,
  };
}

/**
 * Load the data, this action starts the request saga
 * @return {object} An action object with a type of LOAD_DATA
 */
export function loadData() {
  return {
    type: LOAD_DATA,
  };
}

/**
 * Dispatched when the data are loaded by the request saga
 * @param  {array} users The users
 * @return {object}      An action object with a type of LOAD_DATA_SUCCESS passing the user data
 */
export function loadDataSuccess(users) {
  return {
    type: LOAD_DATA_SUCCESS,
    users,
  };
}

/**
 * Dispatched when loading the data fails
 * @param  {object} error The error
 * @return {object}       An action object with a type of LOAD_DATA_ERROR passing the error
 */
export function loadDataError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}
