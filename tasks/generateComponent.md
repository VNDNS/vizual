## Task: Generate a new component type

Your task is to create the frontend code to configure the Table component.
Two inputs allow to set the number of rows and columns in the table.
One button should create random integers from 0 to 100 for each cell in the table,
which is stored in component.configuration.data.

Another button adds a fade-in animation to the scene.


Please also follow the guidelines defined in ./code-style.md.

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

6) Create a Class for the component type for motion-canvas. The name should be the same as the component type but uppercased.
./motion-canvas/src/components/<componentType>.ts