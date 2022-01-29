(function (React$1, ReactDOM, d3) {
    'use strict';
  
    var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
    ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;
  
    const csvUrl =
      'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv';
  
    const useData = () => {
      const [data, setData] = React$1.useState(null);
  
      React$1.useEffect(() => {
        const row = d => {
          d.sepal_length = +d.sepal_length;
          d.sepal_width = +d.sepal_width;
          d.petal_length = +d.petal_length;
          d.petal_width = +d.petal_width;
          return d;
        };
        d3.csv(csvUrl, row).then(setData);
      }, []);
      
      return data;
    };
  
    const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
      xScale.ticks().map(tickValue => (
        React.createElement( 'g', {
          className: "tick", key: tickValue, transform: `translate(${xScale(tickValue)},0)` },
          React.createElement( 'line', { y2: innerHeight }),
          React.createElement( 'text', { style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + tickOffset },
            tickFormat(tickValue)
          )
        )
      ));
  
    const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
      yScale.ticks().map(tickValue => (
        React.createElement( 'g', { className: "tick", transform: `translate(0,${yScale(tickValue)})` },
          React.createElement( 'line', { x2: innerWidth }),
          React.createElement( 'text', {
            key: tickValue, style: { textAnchor: 'end' }, x: -tickOffset, dy: ".32em" },
            tickValue
          )
        )
      ));
  
    const Marks = ({
      data,
      xScale,
      yScale,
      xValue,
      yValue,
      tooltipFormat,
      circleRadius
    }) =>
      data.map(d => (
        React.createElement( 'circle', {
          className: "mark", cx: xScale(xValue(d)), cy: yScale(yValue(d)), r: circleRadius },
          React.createElement( 'title', null, tooltipFormat(xValue(d)) )
        )
      ));
  
    const width = 960;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 65, left: 90 };
    const xAxisLabelOffset = 50;
    const yAxisLabelOffset = 45;
  
    const App = () => {
      const data = useData();
  
      if (!data) {
        return React$1__default.createElement( 'pre', null, "Loading..." );
      }
  
      const innerHeight = height - margin.top - margin.bottom;
      const innerWidth = width - margin.left - margin.right;
  
      const xValue = d => d.petal_length;
      const xAxisLabel = 'Petal Length';
  
      const yValue = d => d.sepal_width;
      const yAxisLabel = 'Sepal Width';
  
      const siFormat = d3.format('.2s');
      const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');
  
      const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();
  
      const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([0, innerHeight]);
  
      return (
        React$1__default.createElement( 'svg', { width: width, height: height },
          React$1__default.createElement( 'g', { transform: `translate(${margin.left},${margin.top})` },
            React$1__default.createElement( AxisBottom, {
              xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat, tickOffset: 5 }),
            React$1__default.createElement( 'text', {
              className: "axis-label", textAnchor: "middle", transform: `translate(${-yAxisLabelOffset},${innerHeight /
              2}) rotate(-90)` },
              yAxisLabel
            ),
            React$1__default.createElement( AxisLeft, { yScale: yScale, innerWidth: innerWidth, tickOffset: 5 }),
            React$1__default.createElement( 'text', {
              className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisLabelOffset, textAnchor: "middle" },
              xAxisLabel
            ),
            React$1__default.createElement( Marks, {
              data: data, xScale: xScale, yScale: yScale, xValue: xValue, yValue: yValue, tooltipFormat: xAxisTickFormat, circleRadius: 7 })
          )
        )
      );
    };
    const rootElement = document.getElementById('root');
    ReactDOM.render(React$1__default.createElement( App, null ), rootElement);
  
  }(React, ReactDOM, d3));