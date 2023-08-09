import {Component, Input, OnInit} from '@angular/core';
import {CriticalPathEdge, CriticalPathNode, FlatCriticalPath} from "../../../../shared/models/CPM";
import {CriticalPathService} from "../../../../services/critical-path.service";

@Component({
  selector: 'app-critical-path-table',
  templateUrl: './critical-path-table.component.html',
  styleUrls: ['./critical-path-table.component.scss']
})
export class CriticalPathTableComponent implements OnInit{
  protected graph: FlatCriticalPath;

  constructor(private criticalPathService: CriticalPathService) {
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

  clonedProducts: { [s: string]: CriticalPathNode } = {};

  onRowEditInit(product: CriticalPathNode) {
    this.clonedProducts[product.id as string] = { ...product };
  }

  onRowEditSave(product: CriticalPathNode) {
    delete this.clonedProducts[product.id as string];
  }

  onRowEditCancel(product: CriticalPathNode, index: number) {
    this.graph.nodes[index] = this.clonedProducts[product.id as string];
    delete this.clonedProducts[product.id as string];
  }

  loadGraph(criticalPath: FlatCriticalPath): void {
      for(let node of criticalPath.nodes){
        node.predecessors = this.predecessors(criticalPath.nodes, criticalPath.edges, node);
      }
      this.graph = criticalPath;
  }
}
