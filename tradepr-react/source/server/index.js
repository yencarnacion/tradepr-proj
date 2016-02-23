
require('es6-promise').polyfill();
import Hapi from 'hapi';
import qs from 'query-string';
import {configureStore} from '../store/configurestore'
import React from 'react';
import serialize from 'serialize-javascript';
import {renderToString} from 'react-dom/server';
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from '../routes'


//const Path = require('path');
const Inert = require('inert');


const server = new Hapi.Server(/*{
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
}*/);
server.connection({ port: 4000 });

server.register(Inert, () => {});

const HTML = ({ content, store }) => (
  <html>
    <head>
      <meta charset="utf-8" />
      <title>TradePR</title>
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }}/>
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }}/>
      <script src="/static/tradepr.js"/>
    </body>
  </html>
)

const getMarkup = (store, renderProps) => {
  const content = renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps}/>
    </Provider>
  )

  return ('<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>))
};

server.route({
    method: 'GET',
    path: '/static/tradepr.js',
    handler: function (request, reply) {
        reply.file('./build/tradepr.js')
    }
});


server.route({
    method: 'GET',
    path: '/{name*}',
    handler: function (request, reply) {

        const query = qs.stringify(request.query);
        const url = request.path + (query.length ? '?' + query : '');
        const memoryHistory = createMemoryHistory(url);
        const store = configureStore(memoryHistory);
        const history = syncHistoryWithStore(memoryHistory, store)

        var replyCalled = false;
        match({ history, routes, location: url }, (error, redirectLocation, renderProps) => {
            if (error) {
              console.log("error");// res.status(500).send(error.message)
            } else if (redirectLocation) {
              console.log("not implemented"); //res.redirect(302, redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
              console.log("not implemented");

              reply(getMarkup(store, renderProps));
              replyCalled = true;
            }
          })

          if(!replyCalled){
        reply(url);
        replyCalled = true;
      }
    }
});

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
