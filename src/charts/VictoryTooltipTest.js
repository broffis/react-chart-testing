/*eslint-disable no-magic-numbers */
import React from "react";
import { VictoryChart, VictoryStack, VictoryAxis, VictoryBar, VictoryTooltip, VictoryLegend } from 'victory'
import { timeFormat, timeParse } from 'd3-time-format';

import { enrollmentData } from '../data/account-health';
import { useState } from "react";

const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b');
const formatDate = (date) => format(parseDate(date));

const dataByKey = {};
const dataByMonth = {};

const keys = {
  "MCV": "MCV",
  "profitMaxUnconstrained": "Profit Max Unconstrained",
  "targetCPA": "Target CPA",
  "targetROAS": "Target ROAS",
  "unenrolled": "Unenrolled",
};

const dateLabels = enrollmentData.map(d => {
  const fullDate = new Date(d.monthNum)
  return formatDate(`${fullDate.getFullYear()}-${fullDate.getMonth() + 1}-${fullDate.getDate()}`)
})

const legendKeys = (keys = []) => {
  return keys.map(k => { return { name: k}})
} 


const displayStack = (data) => {
  for (const key in keys) {
    dataByKey[key] = data.map(d => {
      const fullDate = new Date(d.monthNum)
      return { 
        month: formatDate(`${fullDate.getFullYear()}-${fullDate.getMonth() + 1}-${fullDate.getDate()}`),
        enrollment: d[key] ? Number(d[key]) : 0
      }
    })
  }

  data = data.map(d => {
    const fullDate = new Date(d.monthNum)
    return {
      ...d,
      monthEasyRead: formatDate(`${fullDate.getFullYear()}-${fullDate.getMonth() + 1}-${fullDate.getDate()}`)
    }
  })

  data.forEach(d => {
    dataByMonth[d.monthEasyRead] = []
    for (const [key, value] of Object.entries(keys)) {
      dataByMonth[d.monthEasyRead].push({ label: key, value: d[key]})
    }
  })

  const victoryBars = [];

  for (const [key, value] of Object.entries(dataByKey)) {
    const display = <VictoryBar data={value} x="month" y="enrollment" />
    victoryBars.push(display)
  }

  return (
      victoryBars
  )
}

displayStack(enrollmentData);



const VictoryTooltipTest = (props) => {
  const [ displayLegendTooltip, setDisplayLegendTooltip ] = useState(false);
  const [ legendTooltipData, setLegendTooltipData ] = useState([]);

  const containerStyle = {
    display: props.height > 0 ? 'flex' : 'none',
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  };

  const parentStyle = {
    border: "1px solid #ccc",
    maxWidth: "75%",
  };

  const toggleLegend = (name = null) => {
    if (!name) {
      setTimeout(() => {
        setDisplayLegendTooltip(false)
        setLegendTooltipData([])
      }, 750)
    } else {
      setDisplayLegendTooltip(true);

      for (const [key, value] of Object.entries(keys)) {
        if (value === name) setLegendTooltipData(dataByKey[key])
      }
    }
  }

  return (
    <div className="demo" >
      <div style={containerStyle}>

        <VictoryChart
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
          style={{ parent: parentStyle }}
          domainPadding={{
            x: [60, 40],
            y: [20, 0]
          }}
          padding={{ top: 70, left: 60, right: 30, bottom: 30 }}
        >
          {/* <VictoryTooltip
            active={displayLegendTooltip}
            data={legendTooltipData}
            cornerRadius={4}
            flyoutStyle={{ stroke: "black" }}
            cornerRadius={0}
            pointerLength={20}
            style={{
              fill: 'black'
            }}
            horizontal={false}
            groupComponent={<g><tspan>Testing groupComponent</tspan></g>}
          >
            <p>This is the new tooltip test</p>
          </VictoryTooltip> */}
          <VictoryLegend x={29} y={0}
            title="Legend"
            centerTitle
            orientation="horizontal"
            rowGutter={{ top: 0, bottom: 0 }}
            borderPadding={{ left: 0, right: 5 }}
            style={{
              border: { stroke: "black" },
              title: {fontSize: 14 },
              labels: { fontSize: 10 }
            }}
            colorScale={"qualitative"}
            data={legendKeys(Object.values(keys))}
            events={[{
              target: "data",
              eventHandlers: {
                onMouseEnter: () => {
                  return [
                    {
                      target: "data",
                      mutation: ({ datum }) => toggleLegend(datum.name)
                    },
                  ]
                },
                onMouseLeave: () => {
                  return [
                    {
                      target: "data",
                      mutation: () => toggleLegend()
                    },
                  ]
                },
              },
            }]}
          />
          {/* <VictoryTooltip
            active={displayLegendTooltip}
            data={legendTooltipData}
            constrainToVisibleArea
            cornerRadius={4}
            flyoutStyle={{ stroke: "black" }}
            cornerRadius={0}
            pointerLength={20}
            style={{
              fill: 'black'
            }}
          /> */}
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={dateLabels.map((_, i) => i + 1)}
            tickFormat={dateLabels}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => (`${x}%`)}
            style={{
              grid: { stroke: "grey", size: 3}
            }}
          />
          <VictoryStack
            colorScale={"qualitative"}
            style={{ data: { width: 50 } }}
            labelComponent={
              <VictoryTooltip
                activateData
                constrainToVisibleArea
                cornerRadius={4}
                flyoutStyle={{ stroke: "black" }}
                cornerRadius={0}
                pointerLength={20}
                style={{
                  fill: 'black'
                }}
              />
            }
            labels={({datum}) => dataByMonth[datum.month].map(d => `${keys[d.label]}: ${d.value ? d.value : '0.0'}`)}
          >
            { displayStack(enrollmentData) }
          </VictoryStack>
        </VictoryChart>
      </div>
    </div>
  );
}

export default VictoryTooltipTest;