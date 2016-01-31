import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { reduxReactRouter } from 'redux-router'
import rootReducer from '../reducers'
import createHistory from 'history/lib/createBrowserHistory'
import routes from '../routes'

const loggerMiddleware = createLogger()

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  reduxReactRouter({ routes, createHistory }),
  applyMiddleware(loggerMiddleware)
)(createStore)

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);
    return store
}
