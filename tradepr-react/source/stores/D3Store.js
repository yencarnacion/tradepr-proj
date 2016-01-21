var AppDispatcher = require('../AppDispatcher');
var { EventEmitter } = require('events');
var { ActionTypes } = require('../Constants');
var assign = require('react/lib/Object.assign');


var events = new EventEmitter();
var CHANGE_EVENT = 'CHANGE';

var state = {
  countries: [],
  loaded: false
};

var setState = (newState) => {
  assign(state, newState);
  events.emit(CHANGE_EVENT);
};

var D3Store = {
  addChangeListener (fn) {
    events.addListener(CHANGE_EVENT, fn);
  },

  removeChangeListener (fn) {
    events.removeListener(CHANGE_EVENT, fn);
  },

  getState (what) {
    if(what==="IMPORTS"){
      return state.countries.topimports
    }
    if(what==="EXPORTS"){
      return state.countries.topexports
    }
    if(what==="COUNTRIES"){
      return state.countries;
    }
    return state;
  }
};

D3Store.dispatchToken = AppDispatcher.register((payload) => {
  var { action } = payload;

  if (action.type === ActionTypes.COUNTRIES_LOADED) {
    setState({
      loaded: true,
      countries: action.countries
    });
  }


});

module.exports = D3Store;
