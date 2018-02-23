import { fromJS } from 'immutable';

import {
  selectRoute,
  selectLocation,
  selectGlobal,
  selectUserData,
  selectLoading,
  selectLoadingError,
} from '../selectors';


describe('HomePage selectors', () => {
  it('selectRoute should select the route state', () => {
    const routeState = fromJS({});
    const state = fromJS({
      route: routeState,
    });

    expect(selectRoute(state)).toEqual(routeState);
  });

  it('selectLocation should select the location state', () => {
    const selector = selectLocation();
    const route = fromJS({
      location: { pathname: '/foo' },
    });
    const mockedState = fromJS({
      route,
    });

    expect(selector(mockedState)).toEqual(route.get('location').toJS());
  });


  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      global: globalState,
    });
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });

  it('selectLoading should select the location state', () => {
    const selector = selectLoading();
    const loading = false;
    const mockedState = fromJS({
      global: {
        loading,
      },
    });

    expect(selector(mockedState)).toEqual(loading);
  });

  it('selectLoadingError should select the location state', () => {
    const selector = selectLoadingError();
    const error = 'womp womp!';
    const mockedState = fromJS({
      global: {
        error,
      },
    });

    expect(selector(mockedState)).toEqual(error);
  });

  it('selectUserData should select the userData state', () => {
    const selector = selectUserData();
    const userData = [];
    const mockedState = fromJS({
      global: {
        userData,
      },
    });

    expect(selector(mockedState)).toEqual(userData);
  });
});
