import merge from "lodash/merge"
import { createAsyncAction } from "@utils/store"
import apiCall from "@services/api"
import { DEFAULT_PAGE_SIZE, ENDPOINT } from "@constants/app"

export const LOAD_TOURS = createAsyncAction('tours/LOAD')

export const loadTours = (params: any) => (dispatch: any, getState: any) => {
  const defaultParams = {
    page: {
      number: 1,
      size: DEFAULT_PAGE_SIZE,
    },
    filters: {}
  }

  const {
    page: {
      number,
      size
    },
    filters: {
      country,
      city
    }
  } = merge({}, defaultParams, params)

  return apiCall({
    method: 'GET',
    endpoint: ENDPOINT.LOAD_TOURS,
    types: LOAD_TOURS,
    allowInsert: true,
    query: {
      page: number,
      count: size,
      country,
      city
    }
  })(dispatch, getState)
}