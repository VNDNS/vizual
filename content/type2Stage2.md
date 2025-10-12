Your task is to read the following file which describes the evolution of a company with a focus on the evolution of its product lines.
Next you should create a flat map array of products, where you list all products and their relationships to each other.
The shape of the array is:

```
[
  {
    name: string,
    children: string[]
  }
]
```

The file to read is: content/audi-product-lines.md

Your output should be written to a file in this directory called: <filename>.json