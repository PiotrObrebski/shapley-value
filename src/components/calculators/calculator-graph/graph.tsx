import React, { Component, useRef, useState } from "react";
import { firstMissingPositive } from "../../../utilities/calculationg-functions";
import { GraphView, IEdge, IGraphViewProps, INode } from "react-digraph";
import { nodeConfig, PLAYER_TYPE, NODE_KEY, NORMAL_EDGE } from "./config";

const sample = {
  edges: [],
  nodes: [
    {
      id: "1",
      title: "1",
      type: PLAYER_TYPE,
      x: 300,
      y: 300,
    },
  ],
};
interface IGraphProps {
  valueForEdge: string;
}
export const Graph = (props: IGraphProps) => {
  const separatorString = "-copy-of-";
  const copyString = "copied ";
  const [graph, setGraph] =
    useState<{ nodes: INode[]; edges: IEdge[] }>(sample);
  const [selected, setSelected] = useState<IEdge | INode | null>(null);
  const [copied, setCopied] = useState<IEdge | INode | null>(null);
  const [players, setPlayers] = useState(sample.nodes.length);
  const [playersId, setPlayersId] = useState(sample.nodes.length);
  const refElement = useRef<Component<IGraphViewProps>>(null);

  function getNodeIndex(searchNode: { [x: string]: string }): number {
    return graph.nodes.findIndex((node) => {
      return node[NODE_KEY] === searchNode[NODE_KEY];
    });
  }

  const getEdgeIndex = (searchEdge: {
    source: string | number;
    target: string | number;
  }): number => {
    return graph.edges.findIndex((edge) => {
      return (
        edge.source === searchEdge.source && edge.target === searchEdge.target
      );
    });
  };

  const onUpdateNode = (viewNode: INode): void => {
    const tmpGraph = graph;
    const i = getNodeIndex(viewNode);

    tmpGraph.nodes[i] = viewNode;
    setGraph(tmpGraph);
  };

  const onSelectNode = (viewNode: INode | null): void => {
    setSelected(viewNode);
  };

  const onSelectEdge = (viewEdge: IEdge): void => {
    setSelected(viewEdge);
  };

  const onCreateNode = (x: number, y: number): void => {
    const tmpGraph = graph;
    const playersNumbers = tmpGraph.nodes
      .map((element) => element.title.split(copyString).at(-1))
      .filter(String)
      .map(Number);
    const newPlayerNr = firstMissingPositive(playersNumbers);
    const viewNode = {
      id: `${playersId + 1}`,
      title: `${newPlayerNr}`,
      type: PLAYER_TYPE,
      x,
      y,
    };
    tmpGraph.nodes = [...tmpGraph.nodes, viewNode];
    setPlayers(newPlayerNr);
    setPlayersId(playersId + 1);
    setGraph(tmpGraph);
    setSelected(viewNode);
  };

  const onDeleteNode = (
    viewNode: INode,
    _nodeId: number | string,
    nodeArr: INode[]
  ): void => {
    const tmpGraph = graph;
    const newEdges = graph.edges.filter((edge, i) => {
      return (
        edge.source !== viewNode[NODE_KEY] && edge.target !== viewNode[NODE_KEY]
      );
    });

    tmpGraph.nodes = nodeArr;
    tmpGraph.edges = newEdges;

    setPlayers(players - 1);
    setGraph(tmpGraph);
    setSelected(null);
  };

  const shouldEdgeBeCreated = (viewEdge: IEdge): boolean => {
    const viewEdgeRealSource = viewEdge.source?.split(separatorString).at(-1);
    const viewEdgeRealTarget = viewEdge.target?.split(separatorString).at(-1);
    const isConnectionDefined = graph.edges.some((edge) => {
      const edgeSourceRealTitle = edge?.source?.split(separatorString).at(-1);
      const edgeTargetRealTitle = edge?.target?.split(separatorString).at(-1);
      if (
        viewEdgeRealSource === edgeSourceRealTitle &&
        viewEdgeRealTarget === edgeTargetRealTitle
      ) {
        return true;
      }
      if (
        viewEdgeRealSource === edgeTargetRealTitle &&
        viewEdgeRealTarget === edgeSourceRealTitle
      ) {
        return true;
      }
      return false;
    });
    const isSourceCopy = viewEdge.source.includes(separatorString);
    const isTargetOriginal = viewEdgeRealTarget === viewEdgeRealSource;
    const isConnectionValid = !(isSourceCopy && !isTargetOriginal);
    return (
      viewEdge.source !== viewEdge.target &&
      !isConnectionDefined &&
      isConnectionValid
    );
  };
  const onCreateEdge = (sourceViewNode: INode, targetViewNode: INode): void => {
    const tmpGraph = graph;
    const viewEdge: IEdge = {
      source: sourceViewNode[NODE_KEY],
      target: targetViewNode[NODE_KEY],
      handleText: props.valueForEdge,
      type: NORMAL_EDGE,
    };
    if (shouldEdgeBeCreated(viewEdge)) {
      tmpGraph.edges = [...tmpGraph.edges, viewEdge];
      setGraph(tmpGraph);
      setSelected(viewEdge);
    }
  };

  const onSwapEdge = (
    sourceViewNode: INode,
    targetViewNode: INode,
    viewEdge: IEdge
  ): void => {
    const tmpGraph = graph;
    const i = getEdgeIndex(viewEdge);
    const edge = JSON.parse(JSON.stringify(graph.edges[i]));

    edge.source = sourceViewNode[NODE_KEY];
    edge.target = targetViewNode[NODE_KEY];
    tmpGraph.edges[i] = edge;
    graph.edges = [...tmpGraph.edges];

    setGraph(tmpGraph);
    setSelected(edge);
  };

  // Called when an edge is deleted
  const onDeleteEdge = (_viewEdge: IEdge, edges: IEdge[]): void => {
    const tmpGraph = graph;

    tmpGraph.edges = edges;

    setGraph(tmpGraph);
    setSelected(null);
  };

  const onCopySelected = (): void => {
    if (selected?.source) {
      console.warn("Cannot copy selected edges, try selecting a node instead.");

      return;
    }
    if (selected) {
      const x = selected.x + 20;
      const y = selected.y + 20;
      setCopied({ ...selected, x, y });
    }
  };

  const onPasteSelected = (): void | null => {
    if (copied) {
      const arrayOfCopies = graph.nodes.filter((node) => {
        return (
          node.title.split(copyString).at(-1) ===
          copied.title.split(copyString).at(-1)
        );
      });
      if (arrayOfCopies.length >= 2) {
        console.warn("Node already have a copy");
        return null;
      }

      const tmpGraph = graph;
      const newNode = {
        ...copied,
        id: `${playersId + 1}${separatorString}${copied.id}`,
        title: `${copyString}${copied.title}`,
      };
      tmpGraph.nodes = [...tmpGraph.nodes, newNode];
      setGraph(tmpGraph);
      setPlayersId(playersId + 1);
    }
  };

  return (
    <div id="graph" style={{ height: "50rem" }}>
      <GraphView
        showGraphControls={true}
        gridSize={100}
        gridDotSize={1}
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
