import { applyMiddleware, createStore, Reducer } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import rootReducer from './rootReducer'
import IAction from '../../interfaces/IAction'
import { watcherSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()
const loggingReduxMiddleware = () => (next: Function) => (action: IAction) => {
  console.info('Dispatching Action: ', action.type, action.payload || '')
  next(action)
}

const middlewares = [sagaMiddleware, loggingReduxMiddleware]

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer as Reducer<unknown, IAction>)

const store = createStore(persistedReducer, applyMiddleware(...middlewares))
sagaMiddleware.run(watcherSaga)

export { store }

export const persistor = persistStore(store)
