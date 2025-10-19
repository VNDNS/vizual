## Task: Generate a new component type

I want you to create a new component type called Textbox.
Its a simple Rectangle with some text inside at the center.
Inside the configuration we should be able to set the text.

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
./frontend/plugins/animation/components/arrangement/Sidebar.tsx

6) Create a Class for the component type for motion-canvas. The name should be the same as the component type but uppercased.
./motion-canvas/src/components/<componentType>.ts