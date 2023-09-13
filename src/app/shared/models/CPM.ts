export class CriticalPathNode {
  id: string;
  name: string;
  duration: number;
  earlyStart: number;
  earlyFinish: number;
  lateStart: number;
  lateFinish: number;
  float: number;
  predecessors: CriticalPathNode[] | undefined;
}

export class CriticalPathEdge {
  from: string;
  to: string;
}

export class FlatCriticalPath {
  name: string;
  nodes: CriticalPathNode[];
  edges: CriticalPathEdge[];
  criticalPathNodes: CriticalPathNode[];
}

export class CriticalPathCoordinate {
  x: number;
  y: number;
}

export class CriticalPathGraph {
  id: string;
  name: string;
  date: Date;
}
