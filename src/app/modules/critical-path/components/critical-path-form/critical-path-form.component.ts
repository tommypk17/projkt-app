import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CriticalPathNode, FlatCriticalPath} from "../../../../shared/models/CPM";

@Component({
  selector: 'app-critical-path-form',
  templateUrl: './critical-path-form.component.html',
  styleUrls: ['./critical-path-form.component.scss']
})
export class CriticalPathFormComponent implements OnInit{
  @Input('node') node: CriticalPathNode | undefined;
  @Output('add') add: EventEmitter<CriticalPathNode> = new EventEmitter<CriticalPathNode>();
  allNodes: CriticalPathNode[] = [];

  ngOnInit() {
  }

  constructor() {
  }

  loadGraph(criticalPath: FlatCriticalPath): void {
    this.allNodes = criticalPath.nodes.filter(x => x.name != 'end');
  }

  newNode(): void {
    this.node = new CriticalPathNode();
  }

  addNode(): void {
    this.add.next(this.node);
  }

  isNew(): boolean {
    return this.node.id == undefined;
  }
}
