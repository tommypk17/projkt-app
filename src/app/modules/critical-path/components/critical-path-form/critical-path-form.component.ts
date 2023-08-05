import {Component, Input, OnInit} from '@angular/core';
import {CriticalPathNode} from "../../../../shared/models/CPM";

@Component({
  selector: 'app-critical-path-form',
  templateUrl: './critical-path-form.component.html',
  styleUrls: ['./critical-path-form.component.scss']
})
export class CriticalPathFormComponent implements OnInit{
  @Input('node') node: CriticalPathNode | undefined;


  ngOnInit() {
  }

  constructor() {
  }
}
