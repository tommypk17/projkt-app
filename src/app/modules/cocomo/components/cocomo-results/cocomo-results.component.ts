import {Component, Input, OnInit} from '@angular/core';
import {CocomoResponse} from "../../../../shared/models/COCOMO";

@Component({
  selector: 'app-cocomo-results',
  templateUrl: './cocomo-results.component.html',
  styleUrls: ['./cocomo-results.component.scss']
})
export class CocomoResultsComponent implements OnInit {

  @Input('cocomoResults') cocomoResults: CocomoResponse | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
