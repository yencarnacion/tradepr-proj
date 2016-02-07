require('es6-promise').polyfill();
import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import {configureStore} from './store/configurestore'

const store = configureStore()

render(
  <Root store={store} />,
  document.getElementById('root')
)
