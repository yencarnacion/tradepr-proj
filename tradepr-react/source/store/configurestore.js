import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { reduxReactRouter } from 'redux-router'
import { reduxReactRouter as reduxReactRouterServer } from 'redux-router/server'
import rootReducer from '../reducers'
import createHistory from 'history/lib/createBrowserHistory'
import { createMemoryHistory } from 'history';
import routes from '../routes'

const loggerMiddleware = createLogger()

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  reduxReactRouter({ routes, createHistory }),
  applyMiddleware(loggerMiddleware)
)(createStore)

const finalCreateStoreServer = compose(
  applyMiddleware(thunkMiddleware),
  reduxReactRouterServer({ routes, createHistory: createMemoryHistory }),
  applyMiddleware(loggerMiddleware)
)(createStore)

function configureStoreServer(initialState) {
    const store = finalCreateStoreServer(rootReducer, initialState);
    return store
}

function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);
    return store
}
export {configureStoreServer, configureStore};


