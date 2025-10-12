import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

import { readFlowchart } from "./tools/readFlowchart"
import { readContainer } from "./tools/readContainer"
import { addNode } from "./tools/addNode"
import { addNodes } from "./tools/addNodes"
import { addItemToContainer } from "./tools/addItemToContainer"
import { addComponent } from "./tools/addComponent"
import { focusOnSelection } from "./tools/focusOnSelection"
import { fadeInNodes } from "./tools/fadeInNodes"
import { textToSpeech } from "./tools/textToSpeech"
import { writeScript } from "./tools/writeScript"
import { readImages } from "./tools/readImages"
import { assignImageToNode } from "./tools/assignImageToNode"

console.log('mcp server starting...')

const server = new McpServer({ name: "vizual-mcp", version: "0.1.0" })

server.tool(
  "readFlowchart",
  "Reads the flowchart from current scene.",
  {},
  async () => {
    try {
      const data = readFlowchart()
      return { content: [{ type: "text", text: ` ${JSON.stringify(data)}` }] }
    } catch (error) {
      return { content: [{ type: "text", text: `error reading flowchart: ${String(error)}` }] }
    }
  }
)

server.tool(
  "readContainer",
  "Reads the container with the given name.",
  {
    containerName: z.string().describe("The name of the container")
  },
  async (args) => {
    try {
      const data = readContainer(args.containerName)
      return { content: [{ type: "text", text: ` ${JSON.stringify(data)}` }] }
    } catch (error) {
      return { content: [{ type: "text", text: `error reading container: ${String(error)}` }] }
    }
  }
)

server.tool(
  "addNode",
  "Adds a new node to a flowchart under a specified parent node",
  {
    parentName: z.string().describe("The name of the parent node"),
    name: z.string().describe("The name of the new node to add")
  },
  async (args) => {
    try {
      addNode(args.parentName, args.name)
      return { content: [{ type: "text", text: `Successfully added node "${args.name}" to flowchart under parent "${args.parentName}".` }] }
    } catch (error) {
      return { content: [{ type: "text", text: `Error adding node: ${String(error)}` }] }
    }
  }
)

server.tool(
  "addNodes",
  "Adds multiple nodes to a flowchart.",
  {
    nodes: z
      .array(
        z.object({
          parentName: z.string().describe("The name of the parent node"),
          name: z.string().describe("The name of the new node to add")
        })
      )
      .describe("List of nodes to add")
  },
  async (args) => {
    try {
      addNodes(args.nodes)
      return { content: [{ type: "text", text: `Successfully added ${args.nodes.length} nodes to flowchart.` }] }
    } catch (error) {
      return { content: [{ type: "text", text: `Error adding nodes: ${String(error)}` }] }
    }
  }
)

server.tool(
  "addItemToContainer",
  "Adds a new item to a specified container.",
  {
    containerName: z.string().describe("The name of the container"),
    name: z.string().describe("The name of the new item to add")
  },
  async (args) => {
    try {
      addItemToContainer(args.containerName, args.name)
      return { content: [{ type: "text", text: `Successfully added item "${args.name}" to container "${args.containerName}".` }] }
    } catch (error) {
      return { content: [{ type: "text", text: `Error adding item: ${String(error)}` }] }
    }
  }
)

server.tool(
  "addComponent",
  "Adds a specified component to the scene.",
  {
    componentName: z.string().describe("The name of the component to add")
  },
  async (args) => {
    try {
      addComponent(args.componentName)
      return { content: [{ type: "text", text: `Successfully added component "${args.componentName}".` }] }
    } catch (error) {
      return { content: [{ type: "text", text: `Error adding component: ${String(error)}` }] }
    }
  }
)

server.tool(
  "focusOnSelection",
  "Animates the camera to focus on the selected items. If multiple nodes are selected, the camera will adjust the zoom to fit all nodes and pan to the center of the nodes.",
  {
    nodes: z.array(z.string()).describe("The names of the nodes to focus on")
  },
  async (args) => {
    try {
      focusOnSelection(args.nodes)
      return { content: [{ type: "text", text: `Successfully focused on nodes "${args.nodes.join(", ")}".` }] }
    } catch (error) {
      return { content: [{ type: "text", text: `Error focusing on nodes: ${String(error)}` }] }
    }
  }
)

server.tool(
  "fadeInNodes",
  "Fades in the selected nodes.",
  {
    nodes: z.array(z.string()).describe("The names of the nodes to focus on")
  },
  async (args) => {
    try {
      fadeInNodes(args.nodes)
      return { content: [{ type: "text", text: `Successfully faded in nodes "${args.nodes.join(", ")}".` }] }
    } catch (error) {
      return { content: [{ type: "text", text: `Error fading in nodes: ${String(error)}` }] }
    }
  }
)

server.tool(
  "textToSpeech",
  "Converts text to speech.",
  {
    text: z.string().describe("The text to convert to speech")
  },
  async (args) => {
    try {
      await textToSpeech(args.text)
      return { content: [{ type: "text", text: `Successfully converted text to speech.` }] }
    } catch (error) {
      return { content: [{ type: "text", text: `Error converting text to speech: ${String(error)}` }] }
    }
  }
)

server.tool(
  "writeScript",
  "Writes a script to a file.",
  {
    text: z.string().describe("The text to write to the file"),
    node: z.string().describe("The node to assign the script to").optional()
  },
  async (args) => {
    try {
      await writeScript(args.text, args.node)
      return { content: [{ type: "text", text: `Successfully wrote script to file.` }] }
    } catch (error) {
      return { content: [{ type: "text", text: `Error writing script to file: ${String(error)}` }] }
    }
  }
)

server.tool(
  "readImages",
  "Reads the available images",
  {
  },
  async () => {
    try {
      const images = readImages()
      return { content: [{ type: "text", text: `Successfully read images: ${images}` }] }
    } catch (error) {
      return { content: [{ type: "text", text: `Error reading images: ${String(error)}` }] }
    }
  }
)

server.tool(
  "assignImageToNode",
  "Assigns an image to a node",
  {
    node: z.string().describe("The name of the node to assign the image to"),
    image: z.string().describe("The file name of the image to assign to the node including the extension. The names are case sensitive."),
  },
  async (args) => {
    try {
      assignImageToNode(args.node, args.image)
      return { content: [{ type: "text", text: `Successfully assigned image to node.` }] }
    } catch (error) {
      return { content: [{ type: "text", text: `Error assigning image to node: ${String(error)}` }] }
    }
  }
)



const transport = new StdioServerTransport()
await server.connect(transport)