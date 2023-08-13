import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MenuItem} from "primeng/api";
import {OverlayPanel} from "primeng/overlaypanel";
import {Menu} from "primeng/menu";
import {Dialog} from "primeng/dialog";
import {CriticalPathGraph, CriticalPathNode, FlatCriticalPath} from "../../../../shared/models/CPM";
import {CriticalPathGraphComponent} from "../../components/critical-path-graph/critical-path-graph.component";
import {CriticalPathService} from "../../../../services/critical-path.service";
import {CriticalPathTableComponent} from "../../components/critical-path-table/critical-path-table.component";
import {CriticalPathFormComponent} from "../../components/critical-path-form/critical-path-form.component";

@Component({
  selector: 'app-aon',
  templateUrl: './aon.component.html',
  styleUrls: ['./aon.component.scss']
})
export class AonComponent implements OnInit, AfterViewInit {
  @ViewChild('graph') graph: CriticalPathGraphComponent;
  @ViewChild('table') table: CriticalPathTableComponent;
  @ViewChild('form') form: CriticalPathFormComponent;
  @ViewChild('loadPanel') loadPanel: OverlayPanel;

  graphId: string | undefined;
  dialogVisible: boolean = false;
  nodeDetailsVisible: boolean = false;
  selectedNode: CriticalPathNode | undefined;
  deleteSelected: boolean = false;

  protected savedCriticalPaths: CriticalPathGraph[] = [];

  menu: MenuItem[] = [
    {
      label: 'Critical Path',
      items : [
        {
          label: 'View Table',
          icon: 'pi pi-fw pi-table',
          command: (event) => this.dialogVisible = true,
        },
        {
          label: 'Add',
          icon: 'pi pi-fw pi-plus',
          command: (event) => {
            this.nodeDetailsVisible = true;
            this.form.newNode();
          },
        },
        {
          label: 'Save',
          icon: 'pi pi-fw pi-save',
        },
        {
          id: 'delete',
          label: 'Delete',
          icon: 'pi pi-fw pi-trash',
          command: (event) => {
            this.deleteSelected = !this.deleteSelected;
            if(this.deleteSelected) event.item.style = {'background-color': 'red'};
            else event.item.style = {'background-color': 'unset'};
          },
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

  constructor(private criticalPathService: CriticalPathService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  newCriticalPath(): void {

  }

  nodeSelected(node: CriticalPathNode): void {
    if(this.deleteSelected){
      this.confirmationService.confirm({
        key: 'confirmDelete',
        header: 'Delete Node?',
        message: `Are you sure that you want to delete <strong>${node.name}</strong>?`,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.criticalPathService.removeNodeToCriticalPath(this.graphId, node.id).subscribe((res: boolean) => {
            this.criticalPathService.getCriticalPath(this.graphId).subscribe((res: FlatCriticalPath) => {
              this.table.loadGraph(res);
              this.graph.loadGraph(res);
              this.form.loadGraph(res);
            });
          })
        },
        reject: () => {
        }
      });
    }else{
      this.nodeDetailsVisible = true;
      this.selectedNode = node;
    }
  }

  ngAfterViewInit(): void {
  }

  loadSavedCriticalPath(id: string): void {
    this.criticalPathService.getCriticalPath(id).subscribe((res: FlatCriticalPath) => {
      this.table.loadGraph(res);
      this.graph.loadGraph(res);
      this.form.loadGraph(res);
      this.graphId = id;
    });
  }

  addNode(node: CriticalPathNode): void {
    this.criticalPathService.addNodeToCriticalPath({name: node.name, duration: node.duration, previous: node.predecessors.map(x => x.id)}, this.graphId).subscribe((res) => {
      this.criticalPathService.getCriticalPath(this.graphId).subscribe((res: FlatCriticalPath) => {
        this.table.loadGraph(res);
        this.graph.loadGraph(res);
        this.form.loadGraph(res);
        this.nodeDetailsVisible = false;
        this.selectedNode = undefined;
      });
    })
  }

}
