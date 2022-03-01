import React from "react";

export const NODE_KEY = "id";
export const PLAYER_TYPE = "player";
export const NORMAL_EDGE = "normalEdge";
export const nodeTypes = [PLAYER_TYPE];
export const edgeTypes = [NORMAL_EDGE];

const playerShape = (
  <symbol viewBox="0 0 200 200" id="player">
    <circle cx="100" cy="100" r="50" />
    <g>
      <foreignObject width="100%" height="100%">
        <div>test</div>
      </foreignObject>
    </g>
  </symbol>
);

const normalEdgeShape = (
  <symbol viewBox="0 0 50 50" id="normalEdge">
    <rect
      transform="rotate(45)"
      x="27.5"
      y="-7.5"
      width="15"
      height="15"
      fill="currentColor"
    />
  </symbol>
);

export const nodeConfig = {
  EdgeTypes: {
    normalEdge: {
      shape: normalEdgeShape,
      shapeId: "#normalEdge",
    },
  },
  NodeSubtypes: {},
  NodeTypes: {
    player: {
      shape: playerShape,
      shapeId: "#player",
      typeText: "Player",
    },
  },
};
