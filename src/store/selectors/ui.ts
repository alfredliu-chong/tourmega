import get from 'lodash/get'
import { createSelector } from 'reselect'

export const getState = (state: any) => state.ui

export const getFilterForm = (type: string) => createSelector(
  getState,
  state => state[`${type}FilterForm`],
)

export const getCurrentPage = (type: string) => createSelector(
  getState,
  state => get(state, `${type}Paged.number`)
)

export const getFilter = (type: string) => createSelector(
  getState,
  state => get(state, `${type}FilterForm`)
)

export const getCurrentPageSize = (type: string) => createSelector(
  getState,
  state => get(state, `${type}Paged.size`)
)