import { combineReducers } from 'redux'

import tours from './tours'
import ui from './ui'
import persist from './persist'

export default () => 
  combineReducers({
    tours,
    ui,
    persist
  })