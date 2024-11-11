import React, { useState, useEffect } from "react";
import { BaseEdge, getSmoothStepPath } from "@xyflow/react";

export function AnimatedSVGEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Restart animation when edge path changes
    setAnimationKey((prevKey) => prevKey + 1);
  }, [edgePath]);

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} />
      <circle r="4" fill="#ff0073">
        <animateMotion
          key={animationKey}
          dur="4s"
          repeatCount="indefinite"
          path={edgePath}
        >
          <mpath href={`#${id}`} />
        </animateMotion>
      </circle>
      <circle r="4" fill="#ff0073">
        <animateMotion
          key={animationKey}
          dur="4s"
          repeatCount="indefinite"
          path={edgePath}
          begin="2s"
        >
          <mpath href={`#${id}`} />
        </animateMotion>
      </circle>
      <path
        id={id}
        d={edgePath}
        fill="none"
        strokeWidth={2}
        className="react-flow__edge-path"
        strokeDasharray="5,5"
        stroke="#ff0073"
      />
    </>
  );
}
