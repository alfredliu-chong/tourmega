import { createReducer } from '@utils/store'
import { 
  UPDATE_FILTER_FORM,
  CHANGE_PAGE,
  CHANGE_PAGE_SIZE
 } from '@store/actions/ui'
import { DEFAULT_PAGE_SIZE } from '@constants/app'

const initialState = {
  toursFilterForm: {
  },
  toursPaged: {
    number: 1,
    size: DEFAULT_PAGE_SIZE
  }
}

const handlers = {
  [UPDATE_FILTER_FORM]: (state: any, action: any) => {
    const { payload: { type, data } } = action
    return state
      .merge({ [`${type}FilterForm`]: data })
      .setIn([`${type}Paged`, 'number'], 1)
      .setIn([`${type}Paged`, 'size'], DEFAULT_PAGE_SIZE)
  },
  [CHANGE_PAGE]: (state: any, action: any) => {
    const { payload: { type, page } } = action
    return state.setIn([`${type}Paged`, 'number'], page)
  },
  [CHANGE_PAGE_SIZE]: (state: any, action: any) => {
    const { payload: { type, size } } = action
    return state.setIn([`${type}Paged`, 'size'], size)
  },
}

export default createReducer(initialState, handlers)