import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CriticalPathEdge, CriticalPathNode, FlatCriticalPath} from "../../../../shared/models/CPM";
import {CriticalPathService} from "../../../../services/critical-path.service";

@Component({
  selector: 'app-critical-path-table',
  templateUrl: './critical-path-table.component.html',
  styleUrls: ['./critical-path-table.component.scss']
})
export class CriticalPathTableComponent implements OnInit{
  @Output('save') save: EventEmitter<CriticalPathNode> = new EventEmitter<CriticalPathNode>();
  protected graph: FlatCriticalPath;
  protected predecessorOptions: CriticalPathNode[] = []
  constructor() {
  }

  ngOnInit(): void {
  }

  predecessors(nodes: CriticalPathNode[], edges: CriticalPathEdge[], currentNode: CriticalPathNode): CriticalPathNode[] {
    let previousNodes = nodes.filter(x => edges.some(y => y.from == x.id && currentNode.id == y.to));
    if(previousNodes.length > 0) return previousNodes;
    return [];
  }

  predecessorNames(nodes: CriticalPathNode[]): string[] {
    return nodes.map(x => x.name);
  }

  clonedRows: { [s: string]: CriticalPathNode } = {};

  onRowEditInit(row: CriticalPathNode) {
    this.clonedRows[row.id as string] = { ...row };
  }

  onRowEditSave(row: CriticalPathNode) {
    this.save.emit(row);
    delete this.clonedRows[row.id as string];
  }

  onRowEditCancel(row: CriticalPathNode, index: number) {
    this.graph.nodes[index] = this.clonedRows[row.id as string];
    delete this.clonedRows[row.id as string];
  }

  loadGraph(criticalPath: FlatCriticalPath): void {
      for(let node of criticalPath.nodes){
        node.predecessors = this.predecessors(criticalPath.nodes, criticalPath.edges, node);
      }
      this.graph = criticalPath;
      this.predecessorOptions = this.graph.nodes.filter(x => x.name != 'end');
      this.graph.nodes.sort((a,b) => {
        if(a.earlyStart > b.earlyStart) return 1;
        if(a.earlyStart == b.earlyStart) return 0;
        return -1;
      });
  }
}
