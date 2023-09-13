import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-critical-path-node',
  templateUrl: './critical-path-node.component.html',
  styleUrls: ['./critical-path-node.component.scss']
})
export class CriticalPathNodeComponent implements OnInit {

  private _node: CriticalPathNode | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

export class CriticalPathNode {
  id: string | undefined;
  name: string | undefined;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

   duration: number | undefined;
   earlyStart: number | undefined;
   earlyFinish: number | undefined;
   lateStart: number | undefined;
   lateFinish: number | undefined;
  float: number | undefined;
  previous: CriticalPathNode[] | undefined;
}
