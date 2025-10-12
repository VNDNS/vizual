import { makeScene2D } from '@motion-canvas/2d';
import { Grid } from '../components/Grid';
import { waitFor, tween } from '@motion-canvas/core';

export default makeScene2D(function* (view) {

  // Create a basic grid with default settings
  const basicGrid = new Grid({
    gridSize: 50,
    width: 800,
    height: 600,
    stroke: '#cccccc',
    lineWidth: 1,
    opacity: 0.3,
    position: { x: -400, y: -300 }
  });

  // Create a finer grid
  const fineGrid = new Grid({
    gridSize: 25,
    width: 400,
    height: 300,
    stroke: '#666666',
    lineWidth: 1,
    opacity: 0.5,
    position: { x: 0, y: 0 }
  });

  // Add grids to the view
  view.add(basicGrid);
  view.add(fineGrid);

  // Wait for initial display
  yield* waitFor(2);

  // Animate grid properties
  yield* tween(1, value => {
    basicGrid.opacity(0.3 + value * 0.4);
  });

  yield* waitFor(1);

  // Change grid size dynamically
  yield* tween(2, value => {
    fineGrid.gridSize(25 + value * 25);
  });

  yield* waitFor(1);

  // Change stroke color
  yield* tween(1, value => {
    basicGrid.stroke('#ff6666');
    fineGrid.stroke('#6666ff');
  });

})
