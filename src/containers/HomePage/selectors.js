/**
 * state selectors
 */

import { createSelector } from 'reselect';

/**
 * routing selectors
 */
export const selectRoute = (state) => state.get('route');

export const selectLocation = () => createSelector(
  selectRoute,
  (subState) => subState.get('location').toJS()
);


/**
 * user selectors
 */
export const selectGlobal = (state) => state.get('global');

export const selectUserData = () => createSelector(
  selectGlobal,
  (subState) => subState.get('userData').toJS()
);

export const selectLoading = () => createSelector(
  selectGlobal,
  (subState) => subState.get('loading')
);

export const selectLoadingError = () => createSelector(
  selectGlobal,
  (subState) => subState.get('error')
);
