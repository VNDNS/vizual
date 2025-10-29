## Task: Generate/Edit an animation component

#### Task description

Create a new animation component called Clock.
It should display an analog clock with a second hand, a minute hand, and an hour hand.

The ClockProps type should look something like this:
export interface ClockProps extends NodeProps {
  data: ClockConfig;
  ...other props;
}

ClockConfig should look like this:
export interface ClockConfig {
  seconds: number;
  minutes: number;
  hours: number;
}[]

One button should fade in the clock.
Another button should add an animation where the hands move to the times in the clock config one after the other.


For an animation component these points have to be implemented:

1) Add component types to the component types array.
./frontend/plugins/animation/maps/componentTypes.ts

2) Create new directory for data files with the name of the component type.
./server/data/<componentType>/

3) Create a file with initial empty data.
./server/data/<componentType>/initialData.json

4) Create a Component Configuration for that component type.
./frontend/plugins/animation/components/animation/component-configurations/<componentType>Configuration.
No need to create a Headline. This is taken care of in the Sidebar.tsx file.

5) For each required input, that we need to configure the component, we should implement a component input like this:

<div className="input-group">
  <span>{label}</span>
  <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
</div>

6) For each animation, that is implemented in the component configuration, we should implement a ComponentAnimation like this:
<ComponentAnimation label="fadeIn" type="table" method="fadeIn" />


7) For each animation, that is implemented in the component configuration, add a new entry to the component map: ./frontend/plugins/animation/maps/componentMap.ts. Note, that here a field for duration should not be added, because it is taken care of at some other place in the code.

8) Add a new entry to the sidebar options array.
The format of the entry should be: '<name>-configuration'
The name should be the same as the component type but lowercased.
The array is located in: frontend/plugins/animation/components/arrangement/sidebarOptions.ts

9) Within the div-element of class "sidebar-content" you have to add a new entry for the component configuration:
./frontend/plugins/animation/components/arrangement/Sidebar.tsx

10) Create a new component type for motion-canvas. The name should be the same as the component type but uppercased.

Here is a guide on the architecture of motion-canvas components:

Our motion-canvas components implement an architecture that values readability and maintainability:

- Each component is a class that extends the Node class from motion-canvas.
- The class receives a props object of the following shape:

export interface <ComponentName>Props extends NodeProps {
  data: <ComponentName>Config;
  ...other props;
}

<ComponentName>Config usually holds array data which a user would not configure manually.
Besides that, other props can also be used here.

- All types are defined in the types folder:
./motion-canvas/src/components/types

- Each motion-canvas component implements two types of methods.
- initializer methods:
  These methods are called to initialize 'sub-components' They help indicating where each part of the component is constructed.
  The naming convention for these methods is 'initialize<SubComponentName>'.
- animation methods
  These methods are called to animate the component using generator functions.

Please read motion-canvas/src/components/FlowChart.ts and its sub-classes (FlowChartNode, FlowChartEdge) to see an example.

Please also follow the guidelines defined in ./code-style.md.
