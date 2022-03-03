import React from "react";

export const InformationSection = () => {
  return (
    <div>
      <ul>
        <li>To add player, hold shift and click on the grid.</li>
        <li>
          To add edge with value, change the value on the 'Edge value' input,
          then hold shift and click/drag to between players.
        </li>
        <li>To delete a node or edge, click on it and press delete.</li>
        <li>Click and drag nodes to change their position.</li>
        <li>
          To create self edges copy and paste with (Ctrl+C and Ctrl+V) a player
          and create an edge between original and copy.
        </li>
        <li>Note: On Mac computers, use Cmd instead of Ctrl.</li>
      </ul>
    </div>
  );
};
