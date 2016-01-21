var $ = require('jquery');
var { API, ActionTypes } = require('../Constants');
var ServerActionCreators = require('../actions/ServerActionCreators');
var D3Store = require('../stores/D3Store');

var ApiUtils = {
  loadCountries (year, month) {

    if(D3Store.getState().loaded === false){
      $.ajax({
        url: `${API}/api/tradepr/toptrading/${year}/${month}`,
        dataType: 'JSON',
        error: function(error){
          console.log("Error: ", error);
        },
        success: function(data){
            ServerActionCreators.loadedCountries(data);
          }
        })
    }
  },
};

module.exports = ApiUtils;
