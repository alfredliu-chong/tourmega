import get from 'lodash/get'
import { createSelector } from 'reselect'

export const getState = (state: any) => state.tours

export const getTours = createSelector(
  getState,
  state => get(state, 'data')
)

export const getIsLoading = createSelector(
  getState,
  state => get(state, 'isLoadingData')
)