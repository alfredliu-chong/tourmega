import get from "lodash/get"
import pick from "lodash/pick"
import { all, cancel, fork, put, select, takeEvery, throttle } from "redux-saga/effects"

import { CHANGE_PAGE, CHANGE_PAGE_SIZE, UPDATE_FILTER_FORM } from "@store/actions/ui"

import { getState as getUiState } from '@store/selectors/ui'
import { loadTours } from "@store/actions/tours"

function* updateList(param: any) {
  const { type, payload } = param
  const action = get(
    {
      tours: loadTours,
    },
    payload.type
  )

  if (!action) yield cancel()

// @ts-ignore
  const uiState = yield select(getUiState)

  const filters = get(uiState, `${payload.type}FilterForm`, {})

  yield put(action({
    filters,
    page: pick(get(uiState, `${payload.type}Paged`), [
      'number',
      'size'
    ])
  }))
}

function* filterFormUpdating() {
  yield throttle(2000, UPDATE_FILTER_FORM, updateList)
}

export default function* ui() {
  yield all([
    fork(filterFormUpdating),
    takeEvery([CHANGE_PAGE, CHANGE_PAGE_SIZE], updateList),
  ])
}