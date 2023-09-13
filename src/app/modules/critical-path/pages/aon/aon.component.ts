import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MenuItem} from "primeng/api";
import {OverlayPanel} from "primeng/overlaypanel";
import {Menu} from "primeng/menu";
import {Dialog} from "primeng/dialog";
import {CriticalPathEdge, CriticalPathGraph, CriticalPathNode, FlatCriticalPath} from "../../../../shared/models/CPM";
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
  @ViewChild('actionMenu') actionMenu: Menu;

  graphId: string | undefined;
  criticalPathName: string | undefined;
  dialogVisible: boolean = false;
  newCriticalPathDialogVisible: boolean = false;
  nodeDetailsVisible: boolean = false;
  selectedNode: CriticalPathNode | undefined;
  deleteSelected: boolean = false;
  unlinkSelected: boolean = false;
  linkSelected: boolean = false;

  protected savedCriticalPaths: CriticalPathGraph[] = [];

  menu: MenuItem[] = [
    {
      id: 'critical-path',
      label: 'Critical Path',
      items : [
        {
          label: 'View Table',
          icon: 'pi pi-fw pi-table',
          disabled: true,
          command: (event) => this.dialogVisible = true,
        },
        {
          label: 'Add Node',
          icon: 'pi pi-fw pi-plus',
          disabled: true,
          command: (event) => {
            this.nodeDetailsVisible = true;
            this.form.newNode();
          },
        },
        {
          id: 'link',
          label: 'Link Node',
          icon: 'pi pi-fw pi-link',
          disabled: true,
          command: (event) => {
            this.markSelected(event);
          },
        },
        {
          id: 'unlink',
          label: 'Unlink Node',
          icon: 'pi pi-fw pi-times',
          disabled: true,
          command: (event) => {
            this.markSelected(event);
          },
        },
        {
          id: 'delete',
          label: 'Delete Node',
          icon: 'pi pi-fw pi-trash',
          disabled: true,
          command: (event) => {
            this.markSelected(event);
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
          icon: 'pi pi-fw pi-refresh',
          command: (event) => {
            this.newCriticalPathDialogVisible = true;
          }
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

  ngAfterViewInit(): void {
  }

  markSelected(event: any | undefined = undefined): void {
    this.actionMenu.model.find(x => x.id == 'critical-path').items.forEach((item) => {
      item.style = {'background-color': 'unset'};
    })
    if(event == undefined){
      this.unlinkSelected = false;
      this.deleteSelected = false;
      this.linkSelected = false;
      this.refreshMenu();
      return;
    }
    if(event.item.id == 'link'){
      this.unlinkSelected = false;
      this.deleteSelected = false;
      this.linkSelected = !this.linkSelected;
      if(this.linkSelected) event.item.style = {'background-color': '#a7dfff'};
      else event.item.style = {'background-color': 'unset'};
    }
    if(event.item.id == 'unlink'){
      this.linkSelected = false;
      this.deleteSelected = false;
      this.unlinkSelected = !this.unlinkSelected;
      if(this.unlinkSelected) event.item.style = {'background-color': '#ffd08d'};
      else event.item.style = {'background-color': 'unset'};
    }
    if(event.item.id == 'delete'){
      this.linkSelected = false;
      this.unlinkSelected = false;
      this.deleteSelected = !this.deleteSelected;
      if(this.deleteSelected) event.item.style = {'background-color': '#ff8d8d'};
      else event.item.style = {'background-color': 'unset'};
    }

  }

  refreshMenu(): void {
    this.actionMenu.show({})
  }

  nodeSelected(node: CriticalPathNode): void {
    if(this.deleteSelected) {
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
    }
    else if(this.linkSelected){
      //first node being selected
      if(!this.selectedNode){
        this.selectedNode = node;
        return;
      //second node is selected
      }else{
        this.criticalPathService.addEdgeToCriticalPath(this.graphId, {from: this.selectedNode.id, to: node.id}).subscribe((res) => {
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
    else{
      this.nodeDetailsVisible = true;
      this.selectedNode = node;
    }
    this.markSelected(undefined);
  }

  loadSavedCriticalPath(id: string, name: string): void {
    this.criticalPathService.getCriticalPath(id).subscribe((res: FlatCriticalPath) => {
      this.criticalPathName = name;
      this.table.loadGraph(res);
      this.graph.loadGraph(res);
      this.form.loadGraph(res);
      this.graphId = id;
      this.toggleActionMenu();
    });
  }

  toggleActionMenu(): void {
    let disabled: boolean = true;
    if(!this.graphId){
      disabled = true;
    }else{
      disabled = false;
    }
    this.actionMenu.model.find(x => x.id == 'critical-path').items.forEach((item) => {
      item.disabled = disabled
    })
    this.refreshMenu();
  }

  addNode(node: CriticalPathNode): void {
    if(!node.predecessors) node.predecessors = [];
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
  updateNode(node: CriticalPathNode): void {
    if(!node.predecessors) node.predecessors = [];
    this.criticalPathService.updateNodeForCriticalPath({name: node.name, duration: node.duration}, this.graphId, node.id).subscribe((res) => {
      this.criticalPathService.getCriticalPath(this.graphId).subscribe((res: FlatCriticalPath) => {
        this.table.loadGraph(res);
        this.graph.loadGraph(res);
        this.form.loadGraph(res);
        this.nodeDetailsVisible = false;
        this.selectedNode = undefined;
      });
    })
  }

  edgeSelected(edge: CriticalPathEdge): void {
    if(this.unlinkSelected) {
      this.criticalPathService.removeEdgeFromCriticalPath(this.graphId, edge).subscribe((res) => {
        this.criticalPathService.getCriticalPath(this.graphId).subscribe((res: FlatCriticalPath) => {
          this.table.loadGraph(res);
          this.graph.loadGraph(res);
          this.form.loadGraph(res);
          this.nodeDetailsVisible = false;
          this.selectedNode = undefined;
        });
      })
    }
    this.markSelected(undefined);
  }

  saveNewCriticalPath(nameToSave: string): void {
    this.criticalPathService.createCriticalPath({name: nameToSave}).subscribe((res: string) => {
      if(res) {
        this.graphId = res;
        this.loadSavedCriticalPath(this.graphId, nameToSave);
      }
    });
  }

  invalidCriticalPathName(nameToSave: string): boolean {
    if(!nameToSave || nameToSave.trim() == '') return true;
    else return false;
  }
}
