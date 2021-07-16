import get from 'lodash/get'
import head from 'lodash/head'
import set from 'lodash/set'
import Immutable from 'seamless-immutable'
import isArray from 'lodash/isArray'
import { capitalizeFirstLetter } from '@utils/string'

export const createReducer = (initialState: any, handlers: any) => (
  state = Immutable(initialState),
  action: any,
) => (handlers[action.type] ? handlers[action.type](state, action) : state)

export const createAsyncAction = (type: string): tourmega.AsyncAction => ({
  REQUEST: `${type}.REQUEST`,
  SUCCESS: `${type}.SUCCESS`,
  FAILURE: `${type}.FAILURE`,
})

export const createField = (field: string, singular = false) => {
  var addKey = capitalizeFirstLetter(field)
  return {
    [field]: singular ? null : [],
    ['isLoading'.concat(addKey)]: false,
    ['isLoaded'.concat(addKey)]: false
  }
}

export const createReducerHandlers = (actionTypes: tourmega.AsyncAction, handlerOptions?: tourmega.HandlerOption) => {
  const addKey = handlerOptions ? capitalizeFirstLetter(handlerOptions.mapToKey) : ''
  return {
    [actionTypes.REQUEST]: (state: any) => state.merge({
      ['isLoading'.concat(addKey)]: true,
      ['isLoaded'.concat(addKey)]: false,
    }),
    [actionTypes.FAILURE]: (state: any) => state.merge({
      ['isLoading'.concat(addKey)]: false,
      ['isLoaded'.concat(addKey)]: false
    }),
    [actionTypes.SUCCESS]: (state: any, action: any) => {
      let nextState = {
        ['isLoaded'.concat(addKey)]: true,
        ['isLoading'.concat(addKey)]: false
      }

      if (handlerOptions) {
        const oldResource = get(state, handlerOptions.mapToKey)
        const payloadResource = get(action, 'payload.data.'.concat(handlerOptions.payloadDataField))

        const isInserting = get(action, 'allowInsert')
        
        if (handlerOptions.singular) {
          set(nextState, handlerOptions.mapToKey, isArray(payloadResource) ? head(payloadResource) : payloadResource)
        } else {
          set(nextState, handlerOptions.mapToKey, isInserting ? [...oldResource, ...payloadResource] : payloadResource)
        }
      }

      return state.merge(nextState)
    }
  }
}