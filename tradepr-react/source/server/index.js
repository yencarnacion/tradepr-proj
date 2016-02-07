
require('es6-promise').polyfill();
import Hapi from 'hapi';
import qs from 'query-string';
import configureStoreServer from '../store/configurestore'
import Root from '../containers/Root';
import serialize from 'serialize-javascript';
import {reduxReactRouter, match} from 'redux-router/server'
import React from 'react';
import {renderToString} from 'react-dom/server';
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


const getMarkup = (store) => {
  const initialState = serialize(store.getState());

  const markup = renderToString(
    <Root store={store} key="root" />
  );

  return `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>TradePR</title>
      </head>
      <body>
        <div id="root">${markup}</div>
        <script>window.__initialState = ${initialState};</script>
        <script src="/static/tradepr.js"></script>
      </body>
    </html>
  `;
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
        const store = configureStoreServer();
        const query = qs.stringify(request.query);
        const url = request.path + (query.length ? '?' + query : '');

        store.dispatch(match(url, (error, redirectLocation, routerState) => {
          if (error) {
            console.error('Router error:', error);
            console.log('not implemented');
            //reply.status(500).send(error.message);
          } else if (redirectLocation) {
            //reply.redirect(302, redirectLocation.pathname + redirectLocation.search);
            console.log('not implemented');
          } else if (!routerState) {
            //reply.status(400).send('Not Found');
            console.log('not implemented');
          } else {
            reply(getMarkup(store));
          }
        }));

        //reply(url);
    }
});

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
