# Mermaid Graph React Component

A customizable React component that renders Mermaid diagrams with interactive nodes and edges. Designed to simplify embedding Mermaid.js graphs in your React applications.

## Features

- Render Mermaid diagrams within React applications.
- Interactively click nodes and edges with customizable click handlers.
- Automatically updates when props change for dynamic graphs.

## Installation

Install the package via npm:

```bash
npm install mermaid-graph 

```

Usage

Import the MermaidGraph component and use it in your React application:


```typescript

import React from "react";
import { MermaidGraph } from "mermaid-graph";

export default function App() {
  const graphCode = `
    graph TD
    A[Start] --> B{Decision}
    B -->|edge| C[End]
    B -->|edge| D[Alternative End]
  `;

  const paths = [
    "A -> edge -> B -> edge -> D",
    "A -> edge -> B -> edge -> C"
  ];

  const handleNodeClick = (node: string) => {
    alert(`Node clicked: ${node}`);
  };

  const handleEdgeClick = (edge: string) => {
    alert(`Edge clicked: ${edge}`);
  };

  return (
    <MermaidGraph
      graphCode={graphCode}
      paths={paths}
      onNodeClick={handleNodeClick}
      onEdgeClick={handleEdgeClick}
    />
  );
}

```
Props

graphCode

	•	Type: string
	•	Required: true
	•	Description: The Mermaid syntax string that defines the graph structure. 

paths

	•	Type: string[]
	•	Required: false
	•	Description: An array of paths to style within the graph. Each path should use -> syntax to denote nodes and edges in sequence.

onNodeClick

	•	Type: (node: string) => void
	•	Required: false
	•	Description: Callback function triggered when a node is clicked. Returns the ID of the clicked node.

onEdgeClick

	•	Type: (edge: string) => void
	•	Required: false
	•	Description: Callback function triggered when an edge is clicked. Returns the ID of the clicked edge.

Example Graph Code

Here’s an example of a more complex Mermaid graph definition you can use with graphCode:

```typescript
const graphcode =`
graph TD
S0((S0)) -->|0a| D1((D1))
D1((D1)) -->|1a| D3((D3))
D1((D1)) -->|1b| D2((D2))
D2((D2)) -->|2a| D5((D5))
D2((D2)) -->|2b| D6((D6))
D2((D2)) -->|2c| D4((D4))
D3((D3)) -->|3a| E5((E5))
D3((D3)) -->|3b| D7((D7))
D4((D4)) -->|4a| D8((D8))
D4((D4)) -->|4b| E6((E6))
`

```

Customizing with paths

You can highlight specific paths within your graph. For example:

```typescript
const paths = [
  "S0 -> 0a -> D1 -> 1b -> D2 -> 2c -> D4 -> 4a -> D8",
  "S0 -> 0a -> D1 -> 1a -> D3 -> 3b -> D7"
];

```


Development

For local development:

	1.	Clone the repository.
	2.	Install dependencies with npm install.
	3.	Run Storybook to preview changes in a development environment:

 ```bash 
npx storybook init
```

```bash 
npm run storybook
```


License

This project is licensed under the MIT License.

### Explanation of Sections

- **Installation**: Basic npm/yarn installation commands.
- **Usage**: Example usage of the component, including the key props and example values.
- **Props Documentation**: Details each prop with type, requirement, and description.
- **Customizing Paths**: Shows how to use the `paths` prop for customization.
- **Development Instructions**: For contributors to preview and test changes locally.

This structure gives your users a clear guide on how to get started, use the component, and customize it to fit their needs.
