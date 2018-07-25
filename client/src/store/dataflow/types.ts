import { Node, NodeSave } from '@/components/node';
import { InputPort, OutputPort } from '@/components/port';
import Edge, { EdgeSave } from '@/components/edge/edge';
import DataflowCanvas from '@/components/dataflow-canvas/dataflow-canvas';

export interface DataflowState {
  canvas: DataflowCanvas | undefined;
  nodeTypes: NodeType[];
  nodes: Node[];
  numNodeLayers: number; // number of node layers, each node is on its own layer to define front/back ordering

  diagramName: string; // User-readable diagram name. This does not need to be unique.
  filename: string; // Filename stored on the server. This must be unique must is invisible to the user.

  isDeserializing: boolean;
}

export interface NodeType {
  id: string;
  title: string;
  imgSrc: string;
  constructor: Function; // tslint:disable-line ban-types
  tags: string; // text description used for searching
}

export interface CreateNodeData {
  type?: string;
  // Either use (x, y) or (centerX, centerY) to set the node's position.
  // Only one of them will be respected.
  dataflowX?: number;
  dataflowY?: number;
  dataflowCenterX?: number;
  dataflowCenterY?: number;
}

export interface CreateNodeOptions extends CreateNodeData {
  type: string;
  activate?: boolean;
}

export interface CreateNodeData {
  dataflowX?: number;
  dataflowY?: number;
  dataflowCenterX?: number;
  dataflowCenterY?: number;
}

export interface CreateEdgeOptions {
  sourcePort: OutputPort;
  targetPort?: InputPort;
  targetNode?: Node;
}

export interface ConnectionInfo {
  nodeId: string;
  portId: string;
}

export interface DiagramSave {
  diagramName: string;
  nodes: NodeSave[];
  edges: EdgeSave[];
}

export interface DiagramInfo {
  diagramName: string;
  filename: string;
  updatedAt: string;
}

export enum DiagramHistoryEventType {
  CREATE_NODE = 'create-node',
  REMOVE_NODE = 'remove-node',
  CREATE_EDGE = 'create-edge',
  REMOVE_EDGE = 'remove-edge',
}
