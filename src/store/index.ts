import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  seamlessImmutableReconciler,
  seamlessImmutableTransformCreator
} from 'redux-persist-seamless-immutable'

import createRootReducer from '@store/reducers'
import rootSaga from '@store/sagas'

const transformerConfig = {
  whitelistPerReducer: {}
}

const persistConfig = {
  key: 'bam',
  storage: AsyncStorage,
  whitelist: ['persist'],

  stateReconciler: seamlessImmutableReconciler,
  transforms: [seamlessImmutableTransformCreator(transformerConfig)]
}

export default () => {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [thunkMiddleware, sagaMiddleware]

  let enhancer = applyMiddleware(...middleware)

  const persistedReducer = persistReducer(
    persistConfig,
    createRootReducer()
  )

  const store = createStore(persistedReducer, enhancer)

  const persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
