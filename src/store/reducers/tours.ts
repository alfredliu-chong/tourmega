import { createField, createReducer, createReducerHandlers } from "@utils/store"
import { LOAD_TOURS } from "@store/actions/tours"

const initialState = {
  ...createField('data')
}

const handlers = {
  ...createReducerHandlers(LOAD_TOURS, {
    mapToKey: 'data',
    singular: false,
    payloadDataField: 'data'
  })
}

export default createReducer(initialState, handlers)