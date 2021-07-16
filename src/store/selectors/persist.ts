import { createSelector } from 'reselect'

import get from 'lodash/get'

export const getState = (state: any) => state.persist

export const getAccess = createSelector(
  getState,
  state => state.access
)

export const getAccessToken = createSelector(
  getAccess,
  access => get(access, 'auth_token')
)

export const getHasToken = createSelector(
  getAccessToken,
  token => !!token
)