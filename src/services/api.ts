import qs from 'qs'
import Request from 'superagent'
import get from 'lodash/get'
import has from 'lodash/has'
import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'

import { API } from '@constants/app'
import { getAccessToken } from '@store/selectors/persist'

const sendMethod = (HTTPMethod: string) =>
  HTTPMethod === 'post' ||
  HTTPMethod === 'put' ||
  HTTPMethod === 'patch' ||
  HTTPMethod === 'delete'
    ? 'send'
    : 'query'

const sendArguments = (HTTPMethod: string, query: any) =>
  HTTPMethod === 'post' ||
  HTTPMethod === 'put' ||
  HTTPMethod === 'patch' ||
  HTTPMethod === 'delete'
    ? JSON.stringify(query)
    : qs.stringify(query, { arrayFormat: 'brackets' })

const defaultOptions = {
  url: API.V2,
  endpoint: '',
  method: 'GET',
  query: {},
  headers: {},
  types: null,
  allowInsert: false,
  withoutAuthorization: false
}

const absoluteUrl = new RegExp('^(?:[a-z]+:)?//', 'i')

export default (options: any) => async (dispatch: any, getState: any) => {
  const {
    url,
    endpoint,
    method,
    query,
    headers,
    payload,
    types,
    allowInsert,
    withoutAuthorization
  } = merge({}, defaultOptions, options)
  
  const authHeader = getAccessToken(getState())

  const HTTPMethod: 'get' | 'post' | 'put' | 'patch' | 'delete' = method.toLowerCase()

  const fullUrl = absoluteUrl.test(endpoint) ? endpoint : `${url}${endpoint}`

  const request = Request[HTTPMethod](fullUrl).withCredentials()

  request[sendMethod(HTTPMethod)](sendArguments(HTTPMethod, query))

  if (authHeader && !withoutAuthorization) {
    headers.authorization = authHeader
  }

  if (has(types, 'REQUEST')) {
    dispatch({
      type: types.REQUEST,
      payload,
      request,
    })
  }

  return new Promise(resolve => {
    request
      .set({
        ...headers,
      })
      .end((error, data) => {
        if (isEmpty(data) || data.body === null) {
          merge(data, { body: { data: [] } })
        }

        const queryParams = sendArguments(HTTPMethod, query)

        const meta = {
          endpoint: queryParams ? `${endpoint}?${queryParams}` : `${endpoint}`,
        }

        if (error) {
          const failureData = {
            ok: false,
            meta,
            payload,
            error,
            data,
          }

          if (has(types, 'FAILURE')) {
            dispatch({ type: types.FAILURE, ...failureData })
          }

          resolve(failureData)
        } else {
          const body = get(data, 'body')
          const page = get(query, 'page')

          const successData = {
            ok: true,
            allowInsert: allowInsert && page > 1,
            payload: { ...payload, data: body },
          }

          if (has(types, 'SUCCESS')) {
            dispatch({ type: types.SUCCESS, ...successData })
          }

          resolve(successData)
        }
      })
  })
}
