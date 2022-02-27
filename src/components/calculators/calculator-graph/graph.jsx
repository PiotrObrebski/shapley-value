import React, { useRef, useState } from "react";
import { firstMissingPositive } from "../../../utilities/calculationg-functions";
import {
  GraphView, // required
} from "react-digraph";
import {
  default as nodeConfig,
  CUSTOM_EMPTY_TYPE,
  NODE_KEY,
  SPECIAL_EDGE_TYPE,
} from "./config";

import { get } from "lodash";

const sample = {
  edges: [],
  nodes: [
    {
      id: "1",
      title: "1",
      type: CUSTOM_EMPTY_TYPE,
      x: 300,
      y: 300,
    },
  ],
};

export const Graph = (props) => {
  const [graph, setGraph] = useState(sample);
  const [selected, setSelected] = useState({});
  const [copied, setCopied] = useState({});
  const [players, setPlayers] = useState(sample.nodes.length);
  const [playersId, setPlayersId] = useState(sample.nodes.length);
  const refElement = useRef();
  
  function getNodeIndex(searchNode) {
    return graph.nodes.findIndex((node) => {
      return node[NODE_KEY] === searchNode[NODE_KEY];
    });
  }

  // Helper to find the index of a given edge
  const getEdgeIndex = (searchEdge) => {
    return graph.edges.findIndex((edge) => {
      return (
        edge.source === searchEdge.source && edge.target === searchEdge.target
      );
    });
  };

  /*
   * Handlers/Interaction
   */

  // Called by 'drag' handler, etc..
  // to sync updates from D3 with the graph
  const onUpdateNode = (viewNode) => {
    const tmpGraph = graph;
    const i = getNodeIndex(viewNode);

    tmpGraph.nodes[i] = viewNode;
    setGraph(tmpGraph);
  };

  // Node 'mouseUp' handler
  const onSelectNode = (viewNode, event) => {
    // const { id = "" } = event.target;
    const id = get(event, "target.id", "");
    if (id.includes("text")) {
      document.getElementById(event.target.id).click();
    }

    // Deselect events will send Null viewNode
    setSelected(viewNode);
  };

  // Edge 'mouseUp' handler
  const onSelectEdge = (viewEdge) => {
    setSelected(viewEdge);
  };

  // Updates the graph with a new node
  const onCreateNode = (x, y) => {
    console.log(x, y);
    const tmpGraph = graph;
    const players = tmpGraph.nodes.map((element) => element.title);
    const newPlayerNr = firstMissingPositive(players);
    const viewNode = {
      id: playersId + 1,
      title: newPlayerNr,
      type: CUSTOM_EMPTY_TYPE,
      x,
      y,
    };
    setPlayers(newPlayerNr);
    setPlayersId(playersId + 1);
    tmpGraph.nodes = [...tmpGraph.nodes, viewNode];
    setGraph(tmpGraph);
    setSelected(viewNode);
  };

  // Deletes a node from the graph
  const onDeleteNode = (viewNode, nodeId, nodeArr) => {
    console.log(viewNode, nodeId, nodeArr);
    const tmpGraph = graph;
    // Delete any connected edges
    const newEdges = graph.edges.filter((edge, i) => {
      return (
        edge.source !== viewNode[NODE_KEY] && edge.target !== viewNode[NODE_KEY]
      );
    });

    tmpGraph.nodes = nodeArr;
    tmpGraph.edges = newEdges;

    setPlayers(players - 1);
    setGraph(tmpGraph);
    setSelected({});
  };

  // Creates a new node between two edges
  const onCreateEdge = (sourceViewNode, targetViewNode) => {
    const tmpGraph = graph;
    // This is just an example - any sort of logic
    // could be used here to determine edge type

    const viewEdge = {
      source: sourceViewNode[NODE_KEY],
      target: targetViewNode[NODE_KEY],
      handleText: props.valueForEdge,
      type: SPECIAL_EDGE_TYPE,
    };

    // Only add the edge when the source node is not the same as the target
    if (viewEdge.source !== viewEdge.target) {
      tmpGraph.edges = [...tmpGraph.edges, viewEdge];

      setGraph(tmpGraph);
      setSelected(viewEdge);
    }
  };

  // Called when an edge is reattached to a different target.
  const onSwapEdge = (sourceViewNode, targetViewNode, viewEdge) => {
    const tmpGraph = graph;
    const i = getEdgeIndex(viewEdge);
    const edge = JSON.parse(JSON.stringify(graph.edges[i]));

    edge.source = sourceViewNode[NODE_KEY];
    edge.target = targetViewNode[NODE_KEY];
    tmpGraph.edges[i] = edge;
    // reassign the array reference if you want the graph to re-render a swapped edge
    graph.edges = [...tmpGraph.edges];

    setGraph(tmpGraph);
    setSelected(edge);
  };

  // Called when an edge is deleted
  const onDeleteEdge = (viewEdge, edges) => {
    const tmpGraph = graph;

    tmpGraph.edges = edges;

    setGraph(tmpGraph);
    setSelected(null);
  };

  const onCopySelected = () => {
    if (selected.source) {
      console.warn("Cannot copy selected edges, try selecting a node instead.");

      return;
    }

    const x = selected.x + 10;
    const y = selected.y + 10;
    setCopied({ ...selected, x, y });
  };

  const onPasteSelected = () => {
    if (copied) {
      console.warn(
        "No node is currently in the copy queue. Try selecting a node and copying it with Ctrl/Command-C"
      );
    }

    const tmpGraph = graph;
    const newNode = { ...copied, id: playersId + 1 };

    tmpGraph.nodes = [...tmpGraph.nodes, newNode];
    setGraph(tmpGraph);
    setPlayersId(playersId + 1);
  };

  /* Define custom graph editing methods here */

  return (
    <div id="graph" style={{ height: "50rem" }}>
      <GraphView
        allowMultiSelect={true}
        showGraphControls={true}
        gridSize="100rem"
        gridDotSize={1}
        renderNodeText={false}
        ref={refElement}
        nodeKey={NODE_KEY}
        nodes={graph.nodes}
        edges={graph.edges}
        selected={selected}
        nodeTypes={nodeConfig.NodeTypes}
        nodeSubtypes={nodeConfig.NodeSubtypes}
        edgeTypes={nodeConfig.NodeTypes}
        onSelectNode={onSelectNode}
        onCreateNode={onCreateNode}
        onUpdateNode={onUpdateNode}
        onDeleteNode={onDeleteNode}
        onSelectEdge={onSelectEdge}
        onCreateEdge={onCreateEdge}
        onSwapEdge={onSwapEdge}
        onDeleteEdge={onDeleteEdge}
        onCopySelected={onCopySelected}
        onPasteSelected={onPasteSelected}
        readOnly={false}
      />
    </div>
  );
};
export default Graph;
