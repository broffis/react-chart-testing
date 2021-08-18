import { Fragment, useState } from 'react';
import { Bar, BarStack } from '@visx/shape';
import { Group } from '@visx/group';
import { Grid } from '@visx/grid';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { timeFormat, timeParse } from 'd3-time-format';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { LegendOrdinal } from '@visx/legend';
import { localPoint } from '@visx/event';
// import './index.css';

import { enrollmentData } from '../data/account-health';

const color1 = '#1e81b0';
const color2 = '#873e23';
const color3 = '#e28743';
const color4 = '#eab676';
const color5 = '#76b5c5';

const background = '#eeeee4';
const defaultMargin = { top: 40, right: 0, bottom: 0, left: 40 };
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: 'rgba(0,0,0,0.9)',
  color: 'white',
};

const data = enrollmentData;

const keys = [
  "MCV",
  "profitMaxUnconstrained",
  "targetCPA",
  "targetROAS",
  "unenrolled",
];

const visibleKeys = {
  "MCV": "MCV",
  "profitMaxUnconstrained": "Profit Max Unconstrained",
  "targetCPA": "Target CPA",
  "targetROAS": "Target ROAS",
  "unenrolled": "Unenrolled",
}

const enrollmentDataTotals = data.reduce((allTotals, currentMonth) => {
  const totalEnrollment = keys.reduce((monthlyTotal, k) => {
    monthlyTotal += isNaN(Number(currentMonth[k])) ? 0 : Number(currentMonth[k])
    return monthlyTotal;
  }, 0)

  allTotals.push(totalEnrollment);
  return allTotals;
}, [])

const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b');
const formatDate = (date) => {
  if (!date) return
  const fullDate = new Date(date)
  return format(parseDate(`${fullDate.getFullYear()}-${fullDate.getMonth() + 1}-${fullDate.getDate()}`))
};

const getDate = (d) => d.monthNum;

const dateScale = scaleBand({ domain: data.map(getDate), padding: 0.2 });
const spendScale = scaleLinear({
  domain: [
    0,
    Math.max(...enrollmentDataTotals)
  ],
  nice: true
})

const colorScale = scaleOrdinal({
  domain: keys,
  range: [color1, color2, color3, color4, color5],
});

const legendScale = scaleOrdinal({
  domain: Object.values(visibleKeys),
  range: [color1, color2, color3, color4, color5],
});

let tooltipTimeout;

export default function EnrollmentChartVisx({
  width,
  height,
  event = false,
  margin = defaultMargin,
}) {
  const [tooltipShouldDetectBounds, setTooltipShouldDetectBounds] = useState(true);
  const {
    tooltipOpen,
    tooltipTop,
    tooltipLeft,
    hideTooltip,
    showTooltip,
    tooltipData,
  } = useTooltip();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
    detectBounds: tooltipShouldDetectBounds,
  });

  if (width < 10) return null;

  const xMax = width - margin.left;
  const yMax = height - margin.top - 50;

  dateScale.rangeRound([0, xMax]);
  spendScale.range([yMax, 0]);

  const renderTooltipData = (data = {}) => {
    const tooltipDisplayData = [];
    const display = ({ value, key, label}) => (
      <Fragment>
        <div key={`${key}-${formatDate(data.monthNum)}-${value}`}>
          <strong style={{ color: colorScale(key) }}>{label}</strong>:&nbsp;<span>{value ? value : '0.0'}%</span>
        </div>
      </Fragment>
    )

    for (const [key, value] of Object.entries(visibleKeys)) {
      tooltipDisplayData.push(display({
        label: value,
        key,
        value: data[key]
      }))
    }
    return tooltipDisplayData
  }

  return width < 10 ? null : (
    <div style={{ position: 'relative' }}>
      <svg ref={containerRef} width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={14}
        />
        <Grid
          top={margin.top}
          left={margin.left}
          xScale={dateScale}
          yScale={spendScale }
          width={xMax}
          height={yMax}
          stroke='black'
          strokeOpacity={0.1}
          xOffset={dateScale.bandwidth() / 2}
        />
        <Group top={margin.top} left={margin.left}>
          <BarStack
            data={data}
            keys={keys}
            x={getDate}
            xScale={dateScale}
            yScale={spendScale}
            color={colorScale}
            style={{ position: 'relative' }}
          >
            {(barStacks) =>
              barStacks.map((barStack) => {
                return (
                      barStack.bars.map((bar) => (
                        <rect
                          key={`bar-stack-${barStack.index}-${bar.index}`}
                          x={bar.x}
                          y={bar.y}
                          height={bar.height}
                          width={bar.width}
                          fill={bar.color}
                          onClick={() => {
                            if (event) console.log(`Clicked: ${JSON.stringify(bar)}`);
                          }}
                          onMouseLeave={() => {
                            tooltipTimeout = window.setTimeout(() => {
                              hideTooltip();
                            }, 300);
                          }}
                          onMouseMove={(event) => {
                            if (tooltipTimeout) clearTimeout(tooltipTimeout);
                            const left = bar.x + bar.width / 2;
                            const eventSvgCoords = localPoint(event);

                            showTooltip({
                              tooltipData: bar,
                              tooltipTop: eventSvgCoords?.y,
                              tooltipLeft: eventSvgCoords?.x,
                            });
                          }}
                        />
                      ))
                  )
              }
              )
            }
          </BarStack>
        </Group>
        <AxisLeft scale={spendScale} left={margin.left} top={margin.top} />
        <AxisBottom
          top={yMax + margin.top}
          left={margin.left}
          scale={dateScale}
          tickFormat={formatDate}
          stroke={color3}
          tickStroke={color3}
          tickLabelProps={() => ({
            fill: color3,
            fontSize: 11,
            textAnchor: 'middle',
          })}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: margin.top / 2 - 5,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          fontSize: 14,
        }}
      >
        <LegendOrdinal
          scale={legendScale}
          direction='row'
          labelMargin='0 15px 0 0'
          style={{
            display: height > 0 ? 'flex' : 'none',
            top: '15px'
          }}
        />
      </div>
      {
        tooltipOpen && tooltipData && (
          <TooltipInPortal
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
            style={tooltipStyles}
          >
            { renderTooltipData(tooltipData.bar.data) }
          </TooltipInPortal>
      )}
    </div>
  )
}