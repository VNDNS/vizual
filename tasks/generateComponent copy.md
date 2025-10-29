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
./frontend/plugins/animation/components/animation/component-configurations/<componentType>Configuration.

5) For each required input, that we need to configure the component, we should implement a component input like this:

<div className="input-group">
  <span>{label}</span>
  <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
</div>

6) For each animation, that is implemented in the component configuration, we should implement a ComponentAnimation like this:
<ComponentAnimation label="fadeIn" type="table" method="fadeIn" />

