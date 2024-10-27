import React, { useEffect, useState } from "react";
import mermaid from "mermaid";

type MermaidGraphProps = {
  graphCode: string;
  paths?: string[];
  onNodeClick?: (node: string) => void;
  onEdgeClick?: (edge: string) => void;
};

const MermaidGraph: React.FC<MermaidGraphProps> = ({
  graphCode,
  paths = [],
  onNodeClick,
  onEdgeClick,
}) => {

  const [isClient, setIsClient] = useState(false);
  const generateStyledGraphCode = () => {
    let styledGraphCode = graphCode;
    let currentLinkIndex = 0;
    const linkSequence: string[] = [];

    // Assign indices to each link in the Mermaid graph
    graphCode.split("\n").forEach((line) => {
      const match = line.match(/([^\s]+)\s*-->\|([^\|]+)\|\s*([^\s]+)/);
      if (match) {
        const fromNode = match[1].replace(/\(\(.+\)\)/, ""); // Remove extra parentheses
        const label = match[2]; // This is the link label, e.g., "0a"
        const toNode = match[3].replace(/\(\(.+\)\)/, ""); // Remove extra parentheses
        const linkKey = `${fromNode}->${label}->${toNode}`;
        linkSequence.push(linkKey);
        currentLinkIndex += 1;
      }
    });

    // Process each path and apply styling
    paths.forEach((path) => {
      const steps = path.split(" -> ");
      const color = "#00FF00"; // Green for nodes
      const edgeColor = "#0000FF"; // Blue for edges

      for (let i = 0; i < steps.length - 2; i += 2) {
        const fromNode = steps[i];
        const label = steps[i + 1];
        const toNode = steps[i + 2];

        // Apply styles to the nodes
        styledGraphCode += `
          style ${fromNode} fill:${color},stroke:#000000,stroke-width:2px;
          style ${toNode} fill:${color},stroke:#000000,stroke-width:2px;
        `;

        // Create the linkKey and try to find it
        const linkKey = `${fromNode}->${label}->${toNode}`;
        const linkIndex = linkSequence.findIndex((link) => link === linkKey);

        // Apply the link style if we find the index
        if (linkIndex !== -1) {
          styledGraphCode += `
            linkStyle ${linkIndex} stroke:${edgeColor},stroke-width:2px;
          `;
        }
      }
    });

    return styledGraphCode;
  };

  useEffect(() => {
    setIsClient(true); // Set to true only when the component is mounted in the browser
  }, []);

  useEffect(() => {
    if (isClient) {
      // Initialize Mermaid only on the client
      mermaid.initialize({ startOnLoad: true });
      mermaid.contentLoaded();

      // Add event listeners for node and edge clicks
      const svgElement = document.querySelector(".mermaid");
      if (svgElement) {
        svgElement.addEventListener("click", (event) => {
          const target = event.target as HTMLElement;
          if (target.closest(".node")) {
            const nodeId = target.closest(".node")?.id;
            if (onNodeClick && nodeId) {
              const originalNodeName = nodeId.replace(/flowchart-|-.*$/g, "");
              onNodeClick(originalNodeName);
            }
          } else if (
            target.closest(".edgeLabel") ||
            target.closest(".edgePaths")
          ) {
            const edgeLabel = target.closest(".edgeLabel")?.textContent;
            const edgePathId = target.closest("path.edge-thickness-normal")?.id;
            if (edgeLabel) {
              if (onEdgeClick) onEdgeClick(edgeLabel);
            } else if (edgePathId) {
              if (onEdgeClick) onEdgeClick(edgePathId);
            }
          }
        });
      }
    }
  }, [isClient, graphCode, paths]);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  const styledGraphCode = generateStyledGraphCode();
  return (
    <div
      className="mermaid"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
      dangerouslySetInnerHTML={{ __html: styledGraphCode }}
    />
  );
};

export default MermaidGraph;
