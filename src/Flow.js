// src/Component.js
import React, { useCallback, useState, useEffect } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 250, y: 0 }, data: { label: "Run" } },
  { id: "2", position: { x: 250, y: 100 }, data: { label: "Commit" } },
  { id: "3", position: { x: 250, y: 200 }, data: { label: "Push" } },
  { id: "4", position: { x: 250, y: 300 }, data: { label: "Trigger" } },
  {
    id: "5",
    position: { x: 250, y: 400 },
    data: { label: "Scan Vulnerability" },
  },
  { id: "6", position: { x: 250, y: 500 }, data: { label: "Deploy" } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e3-4", source: "3", target: "4", animated: true },
  { id: "e4-5", source: "4", target: "5", animated: true },
  { id: "e5-6", source: "5", target: "6", animated: true },
];

const nodeColor = (node, activeNodeId) => {
  return node.id === activeNodeId ? "#ff0072" : "#1a192b";
};

export default function Component() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeNodeId, setActiveNodeId] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const simulatePipeline = useCallback(() => {
    const steps = nodes.map((node) => node.id);
    let currentStep = 0;

    const executeStep = () => {
      if (currentStep < steps.length) {
        const nodeId = steps[currentStep];
        setActiveNodeId(nodeId);
        console.log(
          `Executing step: ${nodes.find((n) => n.id === nodeId)?.data.label}`,
        );
        currentStep++;
        setTimeout(executeStep, 2000); // Wait for 2 seconds before the next step
      } else {
        setActiveNodeId(null);
        console.log("Pipeline execution completed!");
      }
    };

    executeStep();
  }, [nodes]);

  useEffect(() => {
    // Start the pipeline simulation when the component mounts
    simulatePipeline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-screen bg-gray-100">
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          style: {
            backgroundColor: nodeColor(node, activeNodeId),
            color: node.id === activeNodeId ? "white" : "gray",
            borderRadius: "8px",
            padding: "10px",
            width: "180px",
            fontSize: "16px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow:
              node.id === activeNodeId
                ? "0 0 10px rgba(255,0,114,0.5)"
                : "none",
            transition: "all 0.3s ease",
          },
        }))}
        edges={edges.map((edge) => ({
          ...edge,
          type: "animated",
        }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
