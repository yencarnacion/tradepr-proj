import React from 'react'
import { IndexRoute, Route } from 'react-router'
import Main from './containers/Main'
import Idx from './containers/Idx'
import NotDone from './containers/NotDone'
import Highlights from './containers/Highlights'
import TopTrading from './containers/TopTrading'
import TopTradingDetail from './containers/TopTradingDetail'


export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Idx} />
    <Route path='/highlights' component={Highlights} />
    <Route path="/highlights/toptrading" component={TopTrading}>
       <Route path="/highlights/toptrading/:year/:month"
           component={TopTradingDetail} />
    </Route>
    <Route path='notdone' component={NotDone} />
  </Route>
)
