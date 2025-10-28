Motion-Canvas Component Architecture

Our motion-canvas components implement an architecture that values readability and maintainability:

1) Each component is a class that extends the Node class from motion-canvas.
2) The class receives a props object of the following shape:

export interface <ComponentName>Props extends NodeProps {
  data: <ComponentName>Config;
}

3) All types are defined in the types folder:
./motion-canvas/src/components/types

4) Each motion-canvas component implements two types of methods.
- initializer methods:
  These methods are called to initialize 'sub-components' They help indicating where each part of the component is constructed.
  The naming convention for these methods is 'initialize<SubComponentName>'.
- animation methods
  These methods are called to animate the component using generator functions.

Please read motion-canvas/src/components/FlowChart.ts and its sub-classes (FlowChartNode, FlowChartEdge) to see an example.

Now your task is to create a new component called Table.
It should take an m x n array of strings or number as data.
It then displays the data in a table with m rows and n columns.
Visually it should look like a spreadsheet.
A fade-in animation fades all cells in with a slight delay between them.