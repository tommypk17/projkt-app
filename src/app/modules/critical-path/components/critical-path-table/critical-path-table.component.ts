import {Component, Input, OnInit} from '@angular/core';
import {CriticalPathEdge, CriticalPathNode, FlatCriticalPath} from "../../../../shared/models/CPM";
import {CriticalPathService} from "../../../../services/critical-path.service";

@Component({
  selector: 'app-critical-path-table',
  templateUrl: './critical-path-table.component.html',
  styleUrls: ['./critical-path-table.component.scss']
})
export class CriticalPathTableComponent implements OnInit{
  @Input('graph') graph: FlatCriticalPath;

  constructor(private criticalPathService: CriticalPathService) {
  }

  ngOnInit(): void {
    this.criticalPathService.getFlattenedNodes().subscribe((res: FlatCriticalPath) => {
      this.graph = res;
    });
  }

  predecessors(nodes: CriticalPathNode[], edges: CriticalPathEdge[], currentNode: CriticalPathNode): CriticalPathNode[] {
    let previousNodes = nodes.filter(x => edges.some(y => y.from == x.id && currentNode.id == y.to));
    if(previousNodes.length > 0) return previousNodes;
    return [];
  }

  predecessorNames(nodes: CriticalPathNode[]): string[] {
    return nodes.map(x => x.name);
  }
}
