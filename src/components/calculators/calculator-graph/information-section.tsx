import React from "react";

export const InformationSection = () => {
  return (
    <div>
      <ul>
        <li>To add player, hold shift and click on the grid.</li>
        <li>
          To add edge with value, change the value on the input above, then hold
          shift and click/drag to between players.
        </li>
        <li>To delete a node or edge, click on it and press delete.</li>
        <li>Click and drag nodes to change their position.</li>
        <li>
          You may copy and paste selected nodes and edges with Ctrl+C and Ctrl+V
        </li>
        <li>
          To create self edges copy and paste a player and create an edge
          between them.
        </li>
        <li>Note: On Mac computers, use Cmd instead of Ctrl.</li>
      </ul>
    </div>
  );
};
