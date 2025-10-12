import { makeScene2D } from '@motion-canvas/2d';
import { BarChart } from '../components/BarChart';
import { PieChart } from '../components/PieChart';
import { LinePlot } from '../components/LinePlot';
import { RadarChart } from '../components/RadarChart';
import { createSignal, tween, waitFor } from '@motion-canvas/core';
import { TimeLine } from '../components/TimeLine';
import { LargeNumber } from '../components/LargeNumber';
import { Item } from '../components/Item';
import { Arrangement1 } from '../components/Arrangement1';
import data from '../../../server/data/arrangement1/data1.json';

export default makeScene2D(function* (view) {

  const arrangement1 = new Arrangement1({data})

  view.add(arrangement1)

  yield* arrangement1.activate(0, 1)
  yield* arrangement1.activate(1, 1)
  yield* arrangement1.activate(2, 1)
  yield* arrangement1.activate(3, 1)
  yield* arrangement1.activate(4, 1)
  yield* arrangement1.activate(5, 1)
  yield* arrangement1.activate(6, 1)
  yield* arrangement1.activate(7, 1)
  yield* arrangement1.activate(8, 1)
  yield* arrangement1.activate(9, 1)
  yield* arrangement1.activate(10, 1)
  yield* arrangement1.activate(11, 1)
  yield* arrangement1.activate(12, 1)
  yield* arrangement1.activate(13, 1)
  yield* arrangement1.activate(14, 1)
  yield* arrangement1.activate(15, 1)
  yield* arrangement1.activate(16, 1)
  yield* arrangement1.activate(17, 1) 
  yield* arrangement1.activate(18, 1)
  yield* arrangement1.activate(19, 1)

})
