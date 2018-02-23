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
  const requestURL = 'https://gist.githubusercontent.com/oakley808/69ebfe13f72653a5b8ed02ea4d9e2a18/raw/3530e1d100c8872bd7aee42c1ed4f8f94eab51f8/users.json';

  try {
    const data = yield call(request, requestURL);
    yield put(loadDataSuccess(data));
  } catch (err) {
    yield put(loadDataError(err.message));
  }
}
