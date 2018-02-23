import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_DATA } from 'containers/HomePage/constants';

import request from 'utils/request';

import {
  loadDataSuccess,
  loadDataError,
} from 'containers/HomePage/actions';

import getAllDataWatcher, { getData } from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('getAllDataWatcher Saga', () => {
  it('should watch for LOAD_DATA action and call getData', () => {
    const generator = getAllDataWatcher();

    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_DATA, getData));
  });
});

// test twice to hit both the try and catch block
describe('getData Saga', () => {
  let generator;

  beforeEach(() => {
    generator = getData();
    const callDescriptor = generator.next().value;
  });

  it('should dispatch the loadDataSuccess action if it requests the data successfully', () => {
    const response = [{ name: 'First' }, { name: 'Second' }];
    const putDescriptor = generator.next(response).value;
    expect(putDescriptor).toEqual(put(loadDataSuccess(response)));
  });

  it('should call the loadDataError action if the response errors', () => {
    const error = new Error('Some error');
    const putDescriptor = generator.throw(error).value;
    expect(putDescriptor).toEqual(put(loadDataError(error.message)));
  });
});
