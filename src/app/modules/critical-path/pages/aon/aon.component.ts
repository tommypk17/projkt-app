import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from "primeng/api";
import {OverlayPanel} from "primeng/overlaypanel";
import {Menu} from "primeng/menu";
import {Dialog} from "primeng/dialog";
import {CriticalPathGraph, CriticalPathNode} from "../../../../shared/models/CPM";
import {CriticalPathGraphComponent} from "../../components/critical-path-graph/critical-path-graph.component";

@Component({
  selector: 'app-aon',
  templateUrl: './aon.component.html',
  styleUrls: ['./aon.component.scss']
})
export class AonComponent implements OnInit, AfterViewInit {
  @ViewChild('graph') graph: CriticalPathGraphComponent;
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
          command: (event) => this.loadPanel.toggle(event.originalEvent, event.originalEvent.src)
        },
      ]
    }
  ];

  constructor() { }

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

  }

}
