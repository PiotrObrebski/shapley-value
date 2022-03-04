import React, { Component, useRef, useState } from "react";
import { firstMissingPositive } from "../../../utilities/calculationg-functions";
import { GraphView, IEdge, IGraphViewProps, INode } from "react-digraph";
import { nodeConfig, PLAYER_TYPE, NODE_KEY, NORMAL_EDGE } from "./config";
import {
  setGraphNumberOfPlayers,
  setGraphNodes,
  setGraphEdges,
} from "../../../redux/actions";
import { GraphGame, Store } from "../../../type";
import { connect } from "react-redux";
import { GraphInputSection } from "./graph-input-section";
import { separatorString } from "../../../utilities/calculation-functions";

interface IGraphProps extends GraphGame {
  setGraphNumberOfPlayers: (nrOfPlayes: number) => void;
  setGraphNodes: (nodes: INode[]) => void;
  setGraphEdges: (edges: IEdge[]) => void;
}

export const GraphNotConnected = (props: IGraphProps) => {
  const {
    nrOfPlayes,
    edges,
    nodes,
    setGraphNumberOfPlayers,
    setGraphEdges,
    setGraphNodes,
  } = props;
  const copyString = "copied ";
  const [valueForEdge, setValueForEdge] = useState(0);
  const [selected, setSelected] = useState<IEdge | INode | null>(null);
  const [copied, setCopied] = useState<IEdge | INode | null>(null);
  const refElement = useRef<Component<IGraphViewProps>>(null);

  const getNodeIndex = (searchNode: { [x: string]: string }): number => {
    return nodes
      ? nodes.findIndex((node) => {
          return node[NODE_KEY] === searchNode[NODE_KEY];
        })
      : -1;
  };

  const getEdgeIndex = (searchEdge: {
    source: string | number;
    target: string | number;
  }): number => {
    return edges
      ? edges.findIndex((edge) => {
          return (
            edge.source === searchEdge.source &&
            edge.target === searchEdge.target
          );
        })
      : -1;
  };

  const onUpdateNode = (viewNode: INode): void => {
    const tmpNodes = nodes ?? [];
    const i = getNodeIndex(viewNode);
    tmpNodes[i] = viewNode;
    setGraphNodes(tmpNodes ?? []);
  };

  const onSelectNode = (viewNode: INode | null): void => {
    setSelected(viewNode);
  };

  const onSelectEdge = (viewEdge: IEdge): void => {
    setSelected(viewEdge);
  };

  const onCreateNode = (x: number, y: number): void => {
    const tmpNodes = nodes ?? [];
    const playersNumbers = tmpNodes
      .map((element) => element.title.elementAfterSplit(copyString))
      .filter(String)
      .map(Number);
    const newPlayerNr = firstMissingPositive(playersNumbers);
    const viewNode = {
      id: `${newPlayerNr}`,
      title: `${newPlayerNr}`,
      type: PLAYER_TYPE,
      x,
      y,
    };
    tmpNodes.push(viewNode);
    setGraphNumberOfPlayers(newPlayerNr);
    setGraphNodes(tmpNodes);
    setSelected(viewNode);
  };

  const onDeleteNode = (
    viewNode: INode,
    _nodeId: number | string,
    nodeArr: INode[]
  ): void => {
    const newEdges = edges?.filter((edge, i) => {
      return (
        edge.source !== viewNode[NODE_KEY] && edge.target !== viewNode[NODE_KEY]
      );
    });
    if (!viewNode.title.includes(copyString)) {
      setGraphNumberOfPlayers(nrOfPlayes ? nrOfPlayes - 1 : 0);
    }
    setGraphNodes(nodeArr);
    setGraphEdges(newEdges ?? []);
    setSelected(null);
  };

  const shouldEdgeBeCreated = (viewEdge: IEdge): boolean => {
    const viewEdgeRealSource =
      viewEdge.source?.elementAfterSplit(separatorString);
    const viewEdgeRealTarget =
      viewEdge.target?.elementAfterSplit(separatorString);

    const isConnectionDefined = edges?.some((edge) => {
      const edgeSourceRealTitle =
        edge?.source?.elementAfterSplit(separatorString);
      const edgeTargetRealTitle =
        edge?.target?.elementAfterSplit(separatorString);

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
    const isTargetCopy = viewEdge.target.includes(separatorString);
    const isTargetOriginal = viewEdgeRealTarget === viewEdgeRealSource;
    const isConnectionValid = !(isSourceCopy && !isTargetOriginal);
    return (
      //is the same
      viewEdge.source !== viewEdge.target &&
      //is already defined
      !isConnectionDefined &&
      // apply to game rules
      isConnectionValid &&
      !isTargetCopy
    );
  };

  const onCreateEdge = (sourceViewNode: INode, targetViewNode: INode): void => {
    const viewEdge: IEdge = {
      source: sourceViewNode[NODE_KEY],
      target: targetViewNode[NODE_KEY],
      handleText: valueForEdge.toString(),
      type: NORMAL_EDGE,
    };
    if (shouldEdgeBeCreated(viewEdge)) {
      setGraphEdges([...(edges ?? []), viewEdge]);
      setSelected(viewEdge);
    }
  };

  const onSwapEdge = (
    sourceViewNode: INode,
    targetViewNode: INode,
    viewEdge: IEdge
  ): void => {
    const tmpEdges = edges ?? [];
    const i = getEdgeIndex(viewEdge);
    const edge = JSON.parse(JSON.stringify(tmpEdges[i]));

    edge.source = sourceViewNode[NODE_KEY];
    edge.target = targetViewNode[NODE_KEY];
    tmpEdges[i] = edge;
    setGraphEdges([...tmpEdges]);
    setSelected(edge);
  };

  const onDeleteEdge = (_viewEdge: IEdge, edges: IEdge[]): void => {
    setGraphEdges(edges);
    setSelected(null);
  };

  const onCopySelected = (): void => {
    if (selected?.source) {
      console.warn("Cannot copy selected edges, try selecting a node instead.");
      return;
    }
    if (selected) {
      const x = (selected.x + 20).toString();
      const y = (selected.y + 20).toString();
      setCopied({ ...selected, x, y });
    }
  };

  const onPasteSelected = (): void | null => {
    if (copied) {
      const arrayOfCopies = nodes?.filter((node) => {
        return (
          node.title.elementAfterSplit(copyString) ===
          copied.title.elementAfterSplit(copyString)
        );
      });

      if (arrayOfCopies && arrayOfCopies.length >= 2) {
        console.warn("Node already have a copy");
        return null;
      }

      const tmpNodes = nodes;
      const newNode = {
        ...copied,
        id: `${(nrOfPlayes ?? 0) + 1}${separatorString}${copied.id}`,
        title: `${copyString}${copied.title}`,
      };
      setGraphNodes([...(tmpNodes ?? []), newNode]);
    }
  };

  return (
    <div className="graph-container">
      <GraphInputSection
        valueForEdge={valueForEdge}
        setValueForEdge={setValueForEdge}
      />
      <GraphView
        showGraphControls={true}
        gridSize={12000}
        gridDotSize={1}
        ref={refElement}
        nodeKey={NODE_KEY}
        nodes={nodes ?? []}
        edges={edges ?? []}
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

const mapStateToProps = (state: { aplication: Store }): GraphGame => {
  const { nrOfPlayes, edges, nodes } = state.aplication.graph || {};
  return {
    nrOfPlayes,
    edges,
    nodes,
  };
};
const mapDispatchToProps = (
  dispatch: (arg0: { type: string; payload: number | IEdge[] | INode[] }) => any
) => {
  return {
    setGraphNumberOfPlayers: (nrOfPlayes: number) =>
      dispatch(setGraphNumberOfPlayers(nrOfPlayes)),
    setGraphEdges: (edges: IEdge[]) => dispatch(setGraphEdges(edges)),
    setGraphNodes: (nodes: INode[]) => dispatch(setGraphNodes(nodes)),
  };
};

export const Graph = connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphNotConnected);

export default Graph;
