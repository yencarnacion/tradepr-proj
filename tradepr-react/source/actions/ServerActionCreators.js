var { ActionTypes } = require('../Constants');
var AppDispatcher = require('../AppDispatcher');

var ServerActionCreators = {
  loadedCountries (countries) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.COUNTRIES_LOADED,
      countries: countries
    });
  },
};

module.exports = ServerActionCreators;
