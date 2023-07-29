import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EChartsOption} from "echarts";
import {CriticalPathService} from "../../../../services/critical-path.service";
import {
  FlatCriticalPath,
  CriticalPathNode,
  CriticalPathEdge,
  CriticalPathCoordinate
} from "../../../../shared/models/CPM";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-critical-path-graph',
  templateUrl: './critical-path-graph.component.html',
  styleUrls: ['./critical-path-graph.component.scss']
})
export class CriticalPathGraphComponent implements OnInit, AfterViewInit {

  graphHeight: number = 0;

  updateOption: EChartsOption;
  chartOption: EChartsOption = {
    title: {
      text: 'Critical Path',
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 40,
        symbol: 'rect',
        color: 'lightgrey',
        label: {
          show: true,
        },
        edgeSymbol: ['', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 20,
        },
        data: [],
        links: [],
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0,
        },
      },
    ],
  };

  private _edges: {from: string, to: string}[] | undefined
  private _nodes: CriticalPathNode[] | undefined;
  constructor(private criticalPathService: CriticalPathService) { }

  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    this.criticalPathService.getFlattenedNodes().subscribe((res: FlatCriticalPath) => {
      let nodes = res.nodes;
      let edges = res.edges;
      let criticalPathNodes = res.criticalPathNodes;
      let coordinates = this.calculatePositions(nodes, edges);
      let height = 0;
      let width = 0;

      coordinates.forEach(coordinate => {
        if(height < coordinate.y) height = coordinate.y;
        if(width < coordinate.x) width = coordinate.x;
      });

      this.graphHeight = height + 80 < window.innerHeight? height + 80 : window.innerHeight;

      this.updateOption = {
        series: {
          data: nodes.map((x, i) => ({
            id: x.id,
            name: x.name,
            value: x.duration,
            category: criticalPathNodes.some(y => x.id == y.id)? 'cp': '', x: coordinates.get(x.id).x, y: coordinates.get(x.id).y
          })),
          edges: edges.map(x => ({
            source: x.from,
            target: x.to,
            lineStyle: {
              color: criticalPathNodes.some(y => y.id == x.from) && criticalPathNodes.some(y => y.id == x.to)? '#4939c9' : '#b2b2b2'
            }
          })),
          height: height,
          roam: true,
          categories: [
            {
              name: 'cp',
              itemStyle: {color: '#4939c9'}
            }
          ]
        }
      }
    });
  }

  calculatePositions(nodes: CriticalPathNode[], edges: CriticalPathEdge[]): Map<string, CriticalPathCoordinate> {
    let coordinates: Map<string, CriticalPathCoordinate> = new Map<string, CriticalPathCoordinate>();

    let currentLevel: CriticalPathNode[] = nodes.filter(x => !edges.some(y => y.to == x.id));
    let nextLevel: CriticalPathNode[] = [];
    let x: number = 0;
    let y: number = 0;
    let complete: boolean = false;
    let count = 0;
    while(!complete){
      x = 0;
      for(let node of currentLevel){
        coordinates.set(node.id, {x, y});
        nextLevel = nextLevel.concat(nodes.filter(x => edges.filter(y => y.from == node.id).some(y => y.to == x.id)));
        x = x + 60;
      }
      y = y + 60;
      currentLevel = nextLevel;
      if(nextLevel.length <= 0) complete = true;
      nextLevel = [];
    }
      // console.log(coordinates)

    return coordinates;
  }

  onChartEvent(event: any, type: string) {
    if(type == 'chartClick') this.chartClick(event);
  }

  private chartClick(event: any){
    console.log(event)
  }

}


