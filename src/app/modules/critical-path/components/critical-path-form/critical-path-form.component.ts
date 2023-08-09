import {Component, Input, OnInit} from '@angular/core';
import {CriticalPathNode, FlatCriticalPath} from "../../../../shared/models/CPM";

@Component({
  selector: 'app-critical-path-form',
  templateUrl: './critical-path-form.component.html',
  styleUrls: ['./critical-path-form.component.scss']
})
export class CriticalPathFormComponent implements OnInit{
  @Input('node') node: CriticalPathNode | undefined;
  allNodes: CriticalPathNode[] = [];

  ngOnInit() {
  }

  constructor() {
  }

  loadGraph(criticalPath: FlatCriticalPath): void {
    this.allNodes = criticalPath.nodes;
  }
}
