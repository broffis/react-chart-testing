import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryTooltip } from 'victory';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

const data2012 = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

const data2013 = [
  {quarter: 1, earnings: 15000},
  {quarter: 2, earnings: 12500},
  {quarter: 3, earnings: 19500},
  {quarter: 4, earnings: 13000}
];

const data2014 = [
  {quarter: 1, earnings: 11500},
  {quarter: 2, earnings: 13250},
  {quarter: 3, earnings: 20000},
  {quarter: 4, earnings: 15500}
];

const data2015 = [
  {quarter: 1, earnings: 18000},
  {quarter: 2, earnings: 13250},
  {quarter: 3, earnings: 15000},
  {quarter: 4, earnings: 12000}
];

class VictoryTutorial extends React.Component {
  tooltipDisplay = (datum) => {
    console.log('datum', datum)
    return `y: ${datum.y}`
  }

  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };

    const parentStyle = {
      border: "1px solid #ccc",
      margin: "2%",
      maxWidth: "40%"
    };
    return (

      <div
        style={{
          maxWidth: "350px",
          maxHeight: "350px"
        }}
      >
        <h1>Victory Tutorial</h1>
        <VictoryChart
          domainPadding={20}
          
          
        >
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1, 2, 3, 4]}
            tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => (`$${x / 1000}k`)}
          />
          <VictoryStack style={containerStyle} colorScale={"warm"}>
            <VictoryBar
              data={data2012}
              x="quarter"
              y="earnings"
            />
            <VictoryBar
              data={data2013}
              x="quarter"
              y="earnings"
            />
            <VictoryBar
              data={data2014}
              x="quarter"
              y="earnings"
            />
            <VictoryBar
              data={data2015}
              x="quarter"
              y="earnings"
            />
        </VictoryStack>
        </VictoryChart>
      </div>
    );
  }
}

export default VictoryTutorial