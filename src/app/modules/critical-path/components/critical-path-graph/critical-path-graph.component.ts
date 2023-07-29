import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CriticalPathNode} from "../critical-path-node/critical-path-node.component";

@Component({
  selector: 'app-critical-path-graph',
  templateUrl: './critical-path-graph.component.html',
  styleUrls: ['./critical-path-graph.component.scss']
})
export class CriticalPathGraphComponent implements OnInit, AfterViewInit {

  private _edges: {from: string, to: string}[] | undefined
  private _nodes: CriticalPathNode[] | undefined;
  constructor() { }

  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
  }



  exData: CriticalPathNode = {
    id: "650e6b20-a4ed-4d78-b85b-ddc4253db47f",
    name: "end",
    duration: 0,
    previous: [
      {
        id: "6ae8b073-b15f-466a-b4ee-6f6b1505a7a4",
        name: "N",
        duration: 6,
        previous: [
          {
            id: "53a5f587-3f66-4ef3-9119-de7635f4bdb2",
            name: "L",
            duration: 5,
            previous: [
              {
                id: "a60b2965-4da6-4dd8-aeff-e5dde8f9242d",
                name: "J",
                duration: 8,
                previous: [
                  {
                    id: "20207e92-d854-4a2f-8c9b-04d43715e296",
                    name: "F",
                    duration: 5,
                    previous: [
                      {
                        id: "1d5ac8c8-35b1-43ba-8d6f-ad650e8cade9",
                        name: "E",
                        duration: 4,
                        previous: [
                          {
                            id: "033126a5-ac9f-4cef-a79a-3c9009736b06",
                            name: "C",
                            duration: 10,
                            previous: [
                              {
                                id: "722e1a1b-0937-4645-9e70-d4d0b86c54e7",
                                name: "B",
                                duration: 4,
                                previous: [
                                  {
                                    id: "efb2f142-31eb-40f6-ac73-0d1109bba97a",
                                    name: "A",
                                    duration: 2,
                                    previous: null,
                                    earlyStart: 0,
                                    earlyFinish: 2,
                                    lateFinish: 2,
                                    lateStart: 0,
                                    float: 0
                                  }
                                ],
                                earlyStart: 2,
                                earlyFinish: 6,
                                lateFinish: 6,
                                lateStart: 2,
                                float: 0
                              }
                            ],
                            earlyStart: 6,
                            earlyFinish: 16,
                            lateFinish: 16,
                            lateStart: 6,
                            float: 0
                          }
                        ],
                        earlyStart: 16,
                        earlyFinish: 20,
                        lateFinish: 20,
                        lateStart: 16,
                        float: 0
                      }
                    ],
                    earlyStart: 20,
                    earlyFinish: 25,
                    lateFinish: 25,
                    lateStart: 20,
                    float: 0
                  }
                ],
                earlyStart: 25,
                earlyFinish: 33,
                lateFinish: 33,
                lateStart: 25,
                float: 0
              }
            ],
            earlyStart: 33,
            earlyFinish: 38,
            lateFinish: 38,
            lateStart: 33,
            float: 0
          }
        ],
        earlyStart: 38,
        earlyFinish: 44,
        lateFinish: 44,
        lateStart: 38,
        float: 0
      }
    ],
    earlyStart: 44,
    earlyFinish: 44,
    lateStart: 44,
    lateFinish: 44,
    float: 0
  };
}


