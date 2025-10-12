Hi. I want to create a 2D infographics scene with your help.
Your first task is to help me make up a flowchart depicting the following:

root node: Nintendo
Level 1 children: NES and SNES consoles
Leven 2 children: The Legend of Zelda games per console.

1) name the games and create the correct tree structure.
Your output should have the following shape.
Nodes, that don't have a parent should have a parent of null:

```
[
  {
    name: string,
    parent: string | null,
  },
  ...
]
```

2) Next I want you to add a flowchart component to the scene using the addComponent tool.
The component name is 'flowChart'.

3) Next I want you to add all nodes, that you made up to the flowchart using the 'addNodes' tool.

4) Using the readFlowchart tool read the flowchart.

6) Using the fadeInNodes tool fade the root node first.

7) Using the focusOnSelection tool focus on the root node and its direct children.

8) fade in the children at once.

9) Using the focusOnSelection tool focus on all nodes.

10) fade in all nodes at once.

