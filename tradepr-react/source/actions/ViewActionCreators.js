var { ActionTypes } = require('../Constants');
var AppDispatcher = require('../AppDispatcher');
var ApiUtil = require('../utils/ApiUtil');


var ViewActionCreators = {
  loadCountries (year, month) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_COUNTRIES
    });

    ApiUtil.loadCountries(year, month);

  },

};

module.exports = ViewActionCreators;
