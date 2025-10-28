## Task: Generate a new animation component

Your task is to create a new component to display a table in a scene.
It should take an m x n array of strings or number as data.
Two inputs allow to set the number of rows and columns in the table.
One button should create random integers from 0 to 100 for each cell in the table,
which is stored in component.configuration.data.
It then displays the data in a table with m rows and n columns.
Visually it should look like a spreadsheet.
A fade-in animation fades all cells in with a slight delay between them.
Another button adds a fade-in animation to the scene.

The TableProps type should look something like this:
export interface TableProps extends NodeProps {
  data: (string | number)[][];
  name: string;
  x?: number;
  y?: number;
}


To generate the component type follow these steps:

1) Add component types to the component types array.
./frontend/plugins/animation/maps/componentTypes.ts

2) Create new directory for data files with the name of the component type.
./server/data/<componentType>/

3) Create a file with initial empty data.
./server/data/<componentType>/initialData.json

4) Create a Component Configuration for that component type.
./frontend/plugins/animation/components/animation/component-configurations/<componentType>Configuration.tsx

5) Integrate the component configuration to Sidebar.tsx.
For that you have to add a new entry to the sidebar options array (sidebarOptions).
And within the div-element of class "sidebar-content" you have to add a new entry for the component configuration.
./frontend/plugins/animation/components/arrangement/Sidebar.tsx

6) Create a new component type for motion-canvas. The name should be the same as the component type but uppercased.

Here is a guide on the architecture of motion-canvas components:

Our motion-canvas components implement an architecture that values readability and maintainability:

6.1) Each component is a class that extends the Node class from motion-canvas.
6.2) The class receives a props object of the following shape:

export interface <ComponentName>Props extends NodeProps {
  data: <ComponentName>Config;
  ...other props;
}

<ComponentName>Config usually holds array data which a user would not configure manually.
Besides that, other props can also be used here.

6.3) All types are defined in the types folder:
./motion-canvas/src/components/types

6.4) Each motion-canvas component implements two types of methods.
- initializer methods:
  These methods are called to initialize 'sub-components' They help indicating where each part of the component is constructed.
  The naming convention for these methods is 'initialize<SubComponentName>'.
- animation methods
  These methods are called to animate the component using generator functions.

Please read motion-canvas/src/components/FlowChart.ts and its sub-classes (FlowChartNode, FlowChartEdge) to see an example.

Please also follow the guidelines defined in ./code-style.md.

