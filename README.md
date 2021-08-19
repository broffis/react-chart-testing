# Description

Playing around with the [Visx](https://airbnb.io/visx) and [Victory Charts](https://formidable.com/open-source/victory/docs/victory-chart/) Libraries for React. Testing building simple stacked bar charts using a shared dataset


# Using this Repo
1. Pull down repo and run `npm install`
2. Run `npm start`. Project will be output on port `:3000`

## Notes
- App is displaying `VictoryToolTipTest`, `VisxStackedAH`, and `VisxDrag` components
- `VictoryTutorial`, `VisxBar`, and `VisxStackedBar` are pulled from each project's respective tutorial

-------
## Comparison
### Visx
| Pros | Cons |
| ---- | ---- |
| - Incredibly flexible | - Lack of opinion means you need to investigate each individual piece |
| - Library broken into sub parts to minimize package size | - You will likely need to install and pull in a lot of individual packages, minimizing the gains of chunking |
| - Very pretty with flexible style setup | - Need to account for every place you'll need styles and adds lots of extra code |
| - Built by Airbnb. Expect long support | - Still pretty new |

### Victory
| Pros | Cons |
| ---- | ---- |
| - Reads similar to Chart.js, one of the most popular charting libraries out there | - Can still be cumbersome |
| - Less opinionated, leading to a shorter ramp up time | - Less flexible in some areas (adding random tooltips) |
| - Used by fivethirtyeight | - Download the entire library to use pieces (2.52MB) |
| - Lots of options and solid documentation |

### Package size comparison
| Name | Package Size | Notes |
| ---- | ------------ | ----- |
| Victory | 2.52MB | You need to download the entire library. Requires personal chunking |
| Recharts | 5.29MB | Same as Victory, you need to install the whole library, regardless of intent/use |
| Visx | 743.43kB | Lots of individual packages: - @visx/shape: 287kB  - @visx/group: 7.83kB - @visx/grid: 68.4kB - @visx/axis: 69.2kB - @visx/scale: 141kB - @visx/tooltip: 63.2kB - @visx/legend: 90.9kb - @visx/event: 15.9kB |
