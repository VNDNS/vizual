import { makeScene2D } from '@motion-canvas/2d';
import { BarChart } from '../components/BarChart';
import { PieChart } from '../components/PieChart';
import { LinePlot } from '../components/LinePlot';
import { RadarChart } from '../components/RadarChart';
import { createSignal, tween, waitFor } from '@motion-canvas/core';
import { TimeLine } from '../components/TimeLine';

const timeLineData = [
  { t: 10, event: "Event 1" },
  { t: 20, event: "Event 2" },
  { t: 30, event: "Event 3" },
  { t: 40, event: "Event 4" },
  { t: 50, event: "Event 5" },
  { t: 60, event: "Event 6" },
  { t: 70, event: "Event 7" },
  { t: 80, event: "Event 8" },
  { t: 90, event: "Event 9" },
  { t: 100, event: "Event 10" },
]

export default makeScene2D(function* (view) {

  const dt = 6
  
  const timeLine = new TimeLine({ data: timeLineData, height: 600, tMin: 0, tMax: 40 });

  view.add(timeLine);

  yield* timeLine.runClock(dt)
})
