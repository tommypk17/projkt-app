import {AfterViewInit, Component, OnInit, Output} from '@angular/core';
import {EChartsOption} from "echarts";
import {CriticalPathService} from "../../../../services/critical-path.service";
import {
  FlatCriticalPath,
  CriticalPathNode,
  CriticalPathEdge,
  CriticalPathCoordinate
} from "../../../../shared/models/CPM";
import {Subject} from "rxjs";

@Component({
  selector: 'app-critical-path-graph',
  templateUrl: './critical-path-graph.component.html',
  styleUrls: ['./critical-path-graph.component.scss']
})
export class CriticalPathGraphComponent implements OnInit, AfterViewInit {

  protected graphHeight: number = 0;

  protected updateOption: EChartsOption;
  protected chartOption: EChartsOption;

  private _edges: {from: string, to: string}[] | undefined
  private _nodes: CriticalPathNode[] | undefined;

  @Output('nodeSelected') nodeSelected: Subject<CriticalPathNode> = new Subject<CriticalPathNode>();
  @Output('edgeSelected') edgeSelected: Subject<CriticalPathEdge> = new Subject<CriticalPathEdge>();

  constructor(private criticalPathService: CriticalPathService) {
    this.chartOption = {
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
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  loadGraph(criticalPath: FlatCriticalPath): void {
    let nodes = criticalPath.nodes;
    let edges = criticalPath.edges;
    let criticalPathNodes = criticalPath.criticalPathNodes;
    let coordinates = this.calculatePositions(nodes, edges, criticalPathNodes);
    let height = 0;
    let width = 0;

    this._nodes = nodes;
    this._edges = edges;

    coordinates.forEach(coordinate => {
      if(height < coordinate.y) height = coordinate.y;
      if(width < coordinate.x) width = coordinate.x;
    });

    this.graphHeight = height + 80 < window.innerHeight? height + 80 : window.innerHeight;


    this.updateOption = {
      series: {
        draggable: true,
        data: nodes.map(x => ({
          id: x.id,
          name: x.name,
          value: x.duration,
          category: criticalPathNodes.some(y => x.id == y.id)? 'cp': '',
          x: coordinates.get(x.id) != undefined? coordinates.get(x.id).x : 0,
          y: coordinates.get(x.id) != undefined? coordinates.get(x.id).y: 0
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
  }

  calculatePositions(nodes: CriticalPathNode[], edges: CriticalPathEdge[], criticalPath: CriticalPathNode[]): Map<string, CriticalPathCoordinate> {
    let coordinates: Map<string, CriticalPathCoordinate> = new Map<string, CriticalPathCoordinate>();
    let currentLevel: CriticalPathNode[] = nodes.filter(x => !edges.some(y => y.to == x.id));
    let currentLevelEdges: CriticalPathEdge[] = edges.filter(x => currentLevel.some(y => y.id == x.from));
    let x: number = 0;
    let y: number = 0;
    let endNode: CriticalPathNode = nodes.find(x => x.name == 'end');
    let complete: boolean = false;
    while(!complete){
      x = 0;
      currentLevel = currentLevel.sort((node1, node2) => {
        if(criticalPath.findIndex(x => x.id == node1.id) > -1) return -1;
        return 1;
      });
      for(let node of currentLevel){
        coordinates.set(node.id, {x, y});
        x = x + 60;
      }

      //set the current level to the next level
      currentLevel = nodes.filter(x => edges.filter(y => currentLevel.some(z => z.id == y.from)).some(z => z.to == x.id))
      //set the current level edges to the next level edges
      currentLevelEdges = edges.filter(x => currentLevel.some(y => y.id == x.from));
      //ignore any nodes in the next level that are referenced within the same level
      let ignore = currentLevelEdges.filter(x => currentLevelEdges.some(y => x.to == y.from));
      currentLevel = currentLevel.filter(x => !ignore.some(y => y.to == x.id))
      if(currentLevel.some(x => x.id == endNode.id) && !currentLevel.every(x => x.id == endNode.id)){
        currentLevel = currentLevel.filter(x => x.id != endNode.id)
        currentLevelEdges = currentLevelEdges.filter(x => x.to != endNode.id)
      }
      y = y + 60;
      if(currentLevel.length <= 0) complete = true;

    }
    return coordinates;
  }

  onChartEvent(event: any, type: string) {
    if(type == 'chartClick') this.chartClick(event);
  }

  private chartClick(event: any){
    if(event && event.data){
      //if edge selected
      if(event.data.source && event.data.target) {
        this.edgeSelected.next(this._edges.find(x => x.from == event.data.source && x.to == event.data.target))
        return;
      }
      //if node selected
      else{
        this.nodeSelected.next(this._nodes.find(x => x.id == event.data.id))
        return;
      }
    }
  }

}


