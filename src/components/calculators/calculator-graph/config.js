// @flow
/*
  Copyright(c) 2018 Uber Technologies, Inc.
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
          http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/*
  Example config for GraphView component
*/
import React from "react";

export const NODE_KEY = "id"; // Key used to identify nodes

// These keys are arbitrary (but must match the config)
// However, GraphView renders text differently for empty types
// so this has to be passed in if that behavior is desired.
export const PLAYER_TYPE = "player";
export const NORMAL_EDGE = "normalEdge";

export const nodeTypes = [
  PLAYER_TYPE,
];
export const edgeTypes = [ NORMAL_EDGE];

const playerShape = (
  <symbol viewBox="0 0 200 200" id="player">
    <circle cx="100" cy="100" r="50" />
    <g>
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">test</div>
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

export default {
  EdgeTypes: {
    normalEdge: {
      shape: normalEdgeShape,
      shapeId: "#normalEdge"
    },
  },
  NodeSubtypes: {},
  NodeTypes: {
    player: {
      shape: playerShape,
      shapeId: "#player",
      typeText: "Player"
    }
  }
};
