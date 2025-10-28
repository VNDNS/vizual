Motion-Canvas Component Architecture

Our motion-canvas components implement an architecture that values readability and maintainability:

1) Each component is a class that extends the Node class from motion-canvas.
2) The class receives a props object of the following shape:

export interface <ComponentName>Props extends NodeProps {
  data: <ComponentName>Config;
}

3) All types are defined in the types folder:
./motion-canvas/src/components/types

4) 




