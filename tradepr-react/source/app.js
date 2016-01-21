var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');
var D3Store = require('./stores/D3Store');
var ViewActionCreators = require('./actions/ViewActionCreators');

require('./styles/d3Chart.less');
var d3Chart = {};

d3Chart.create = function(el, props, data) {
  var margin = {top: 20, right: 20, bottom: 300, left: 100};
  var width = 800 - margin.left - margin.right;
  var height = 1400 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width]);

  var y = d3.scale.linear()
     .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
      //.ticks(10, "%");

var svg = d3.select(el).append('svg')
          .attr('class', 'd3')
          .attr('width', width)
          .attr('height', height)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

  x.domain(data.map(function(d) { return d.country; }));
  y.domain([0, d3.max(data, function(d) { return d.su; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Sum");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.country); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.su); })
      .attr("height", function(d) { return height - y(d.su); });
}

var Chart = React.createClass({
/*  getDefaultProps: function() {
    return {
      width: '100%',
      height: '300px'
    };
  },
*/
  propTypes: {
    year: React.PropTypes.number.isRequired,
    month: React.PropTypes.number.isRequired,
  },
  componentDidMount: function() {
    D3Store.addChangeListener(this.handleStoreChange)
    if(D3Store.getState().loaded === false){
       ViewActionCreators.loadCountries(this.props.year,this.props.month);
    } else {
      this.handleStoreChange();
    }
  },
  componentWillUnmount: function () {
    D3Store.removeChangeListener(this.handleStoreChange);
  },
  handleStoreChange: function (){
    var node = ReactDOM.findDOMNode(this);
    d3Chart.create(node, {}/*{
      width: this.props.width,
      height: this.props.height
    }*/, D3Store.getState(this.props.what));

    //this.renderDialogContent();
  },
  componentWillReceiveProps: function(newProps) {
     // its important to pass the new props in
      //this.renderDialogContent(newProps);
  },

  renderDialogContent: function(props) {
    // if called from `componentWillReceiveProps`, then we use the new
    // props, otherwise use what we already have.
    props = props || this.props;

    // the code that used to be in `componentDidMount`
    React.renderComponent(<div>{props.children}</div>, this.node);
  },

  render: function() {
    return (
      <div/>
    );
  },

});

var Country = React.createClass({
    render: function(){
        return (
                <tr>
                    <td>{this.props.country.country}</td>
                    <td>{this.props.country.su}</td>
                </tr>
               );
         }
});

var TopTradingChart = React.createClass({
  propTypes: {
   year: React.PropTypes.number.isRequired,
   month: React.PropTypes.number.isRequired,
 },
    render: function () {
        var importcountries=null;
        var importHead = null;
        if(this.props.countries && this.props.countries.topimports){
            importcountries = this.props.countries.topimports.map(country =>
                <Country key={country.country} country={country}/>
            );
            importHead = (
              <span>
              <h2>Top Imports</h2>
              <Chart what="IMPORTS" year={this.props.year} month={this.props.month} />
              </span>
            );
        } else {
          importHead = (
            <h2>Top Imports</h2>
          );
        }
        var exportcountries=null;
        var exportHead = null;
        if(this.props.countries && this.props.countries.topexports){
            exportcountries = this.props.countries.topexports.map(country =>
              <Country key={country.country} country={country}/>
            );
            exportHead = (
              <span>
              <h2>Top Exports</h2>
              <Chart what="EXPORTS" year={this.props.year} month={this.props.month} />
              </span>
            );
        } else {
          exportHead = (
            <h2>Top Exports</h2>
          );
        }
        return (
            <div>
            {importHead}
            <table>
              <tbody>
                <tr>
                    <th>Country</th>
                    <th>Sum</th>
                </tr>
                {importcountries}
              </tbody>
            </table>
            {exportHead}
            <table>
              <tbody>
                <tr>
                    <th>Country</th>
                    <th>Sum</th>
                </tr>
                {exportcountries}
              </tbody>
            </table>
            </div>
        )

    }
});

var App = React.createClass({
  propTypes: {
   year: React.PropTypes.number.isRequired,
   month: React.PropTypes.number.isRequired,
 },
    getInitialState: function () {
        return ({countries: []});
    },
    componentDidMount: function () {
      D3Store.addChangeListener(this.handleStoreChange1);
      ViewActionCreators.loadCountries(this.props.year,this.props.month);
    },
    componentWillUnmount () {
      D3Store.removeChangeListener(this.handleStoreChange1);
    },
    handleStoreChange1: function() {
      this.setState({
        countries: D3Store.getState().countries
      });
    },
    render: function () {
        return (
            <TopTradingChart countries={this.state.countries} year={this.props.year} month={this.props.month} />
        )
    }
})

var y=2015;
var m=6;
//var AppElement = React.createElement(App);
ReactDOM.render(<App year={y} month={m}></App>, document.getElementById('react-application'));
