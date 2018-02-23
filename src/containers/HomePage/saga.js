import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_DATA } from 'containers/HomePage/constants';

import request from 'utils/request';

import {
  loadDataSuccess,
  loadDataError,
} from 'containers/HomePage/actions';

/**
 * Root daemon saga
 */
export default function* getAllDataWatcher() {
  yield takeLatest(LOAD_DATA, getData);
}

/**
 *  Primary worker saga
 */
export function* getData() {
  const requestURL = 'https://oakley808.github.io/user-manager/users.json';

  try {
    const data = yield call(request, requestURL);
    yield put(loadDataSuccess(data));
  } catch (err) {
    yield put(loadDataError(err.message));
  }
}
