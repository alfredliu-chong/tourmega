import { all, fork } from 'redux-saga/effects'
import ui from './ui'

const rootSaga = function* root() {
  yield all([
    fork(ui)
  ])
}

export default rootSaga