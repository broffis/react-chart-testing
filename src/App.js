import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

// Visx
import { BarGraph as VisxBar } from './charts/VisxBar';
import VisxStackedBar from './charts/VisxStackedBar';

import EnrollmentChartVisx from './charts/VisxStackedAH';
import VisxDrag from './charts/VisxDrag';

// Chart JS
import { StackedBar as CjsStacked } from './charts/ChartJsBar';

// Victory
import VictoryTutorial from './charts/VictoryTutorial';
import VictoryTooltipTest from './charts/VictoryTooltipTest';



function App() {
  const [expandVictory, setExpandVictory] = useState(false);
  const [expandVisxOurs, setExpandVisxOurs] = useState(true);
  const [expandDraw, setExpandDraw] = useState(false);
  return (
    <div className="App">

      <div>
        <p>Victory</p>
        <div className={`our-chart chart ${ expandVictory && '--is-visible'}`}>
          <button onClick={() => setExpandVictory(!expandVictory)}>{ expandVictory ? 'Collapse' : 'Show'}</button>
          <VictoryTooltipTest
            width={800}
            height={ expandVictory ? 500 : 0}
          />
        </div>
      </div>

      <div>
        <p>Visx</p>
        <div className={`our-chart chart ${ expandVisxOurs && '--is-visible'}`}>
          <button onClick={() => setExpandVisxOurs(!expandVisxOurs)}>{ expandVisxOurs ? 'Collapse' : 'Show'}</button>
          <EnrollmentChartVisx
            width={800}
            height={ expandVisxOurs ? 500 : 0}
          />
        </div>

        <div className={`our-chart chart ${ expandDraw && '--is-visible'}`}>
          <button onClick={() => setExpandDraw(!expandDraw)}>{ expandDraw ? 'Collapse' : 'Show'}</button>
          <VisxDrag
            width={800}
            height={ expandDraw ? 500 : 0}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
