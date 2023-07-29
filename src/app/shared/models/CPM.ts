export class CriticalPathNode {
  id: string;
  name: string;
  duration: number;
  earlyStart: number;
  earlyFinish: number;
  lateStart: number;
  lateFinish: number;
  float: number;
}

export class CriticalPathEdge {
  from: string;
  to: string;
}

export class FlatCriticalPath {
  nodes: CriticalPathNode[];
  edges: CriticalPathEdge[];
}

export class CriticalPathCoordinate {
  x: number;
  y: number;
}
