import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from "primeng/api";
import {OverlayPanel} from "primeng/overlaypanel";
import {Menu} from "primeng/menu";
import {Dialog} from "primeng/dialog";
import {CriticalPathGraph, CriticalPathNode, FlatCriticalPath} from "../../../../shared/models/CPM";
import {CriticalPathGraphComponent} from "../../components/critical-path-graph/critical-path-graph.component";
import {CriticalPathService} from "../../../../services/critical-path.service";
import {CriticalPathTableComponent} from "../../components/critical-path-table/critical-path-table.component";

@Component({
  selector: 'app-aon',
  templateUrl: './aon.component.html',
  styleUrls: ['./aon.component.scss']
})
export class AonComponent implements OnInit, AfterViewInit {
  @ViewChild('graph') graph: CriticalPathGraphComponent;
  @ViewChild('table') table: CriticalPathTableComponent;
  @ViewChild('loadPanel') loadPanel: OverlayPanel;

  dialogVisible: boolean = false;
  nodeDetailsVisible: boolean = false;
  selectedNode: CriticalPathNode | undefined;

  protected savedCriticalPaths: CriticalPathGraph[] = [];

  menu: MenuItem[] = [
    {
      label: 'Critical Path',
      items : [
        {
          label: 'View Table',
          icon: 'pi pi-fw pi-table',
          command: (event) => this.dialogVisible = true
        },
        {
          label: 'Add',
          icon: 'pi pi-fw pi-plus'
        },
        {
          label: 'Save',
          icon: 'pi pi-fw pi-save'
        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-trash',
        }
      ]
    },
    {
      separator: true
    },
    {
      label: 'Graph',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-refresh'
        },
        {
          label: 'Load',
          icon: 'pi pi-fw pi-folder-open',
          command: (event) => {
            this.criticalPathService.getSavedCriticalPathNames().subscribe((res) => {
              this.savedCriticalPaths = res;
              this.loadPanel.toggle(event.originalEvent, event.originalEvent.src)
            })
          }
        },
      ]
    }
  ];

  constructor(private criticalPathService: CriticalPathService) { }

  ngOnInit(): void {
  }

  newCriticalPath(): void {

  }

  nodeSelected(node: CriticalPathNode): void {
    this.nodeDetailsVisible = true;
    this.selectedNode = node;
  }

  ngAfterViewInit(): void {
  }

  loadSavedCriticalPath(id: string): void {
    this.criticalPathService.getCriticalPath(id).subscribe((res: FlatCriticalPath) => {
      this.table.loadGraph(res);
      this.graph.loadGraph(res);
    });
  }

}
