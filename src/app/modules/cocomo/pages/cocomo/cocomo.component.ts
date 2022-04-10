import { Component, OnInit } from '@angular/core';
import {KeyValue} from "@angular/common";
import {CocomoModes, CocomoRating, CocomoRequest, CocomoResponse} from "../../../../shared/models/COCOMO";
import {CocomoService} from "../../../../services/cocomo.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-cocomo',
  templateUrl: './cocomo.component.html',
  styleUrls: ['./cocomo.component.scss']
})
export class CocomoComponent implements OnInit {
  cocomoRatingChoices: CocomoRating[] = [];
  cocomoModes: CocomoModes[] = [];
  cocomo: CocomoRequest = new CocomoRequest();
  productCocomoFields: KeyValue<string, string>[] = [];
  hardwareCocomoFields: KeyValue<string, string>[] = [];
  personnelCocomoFields: KeyValue<string, string>[] = [];
  projectCocomoFields: KeyValue<string, string>[] = [];

  displayFirst: boolean = true;
  collapse: boolean = false;

  cocomoResults: CocomoResponse | undefined;

  constructor(private cocomoService: CocomoService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.cocomoRatingChoices = [
      {name:'Very Low', rating:'veryLow'},
      {name:'Low', rating:'low'},
      {name:'Nominal', rating:'nominal'},
      {name:'High', rating:'high'},
      {name:'Very High', rating:'veryHigh'}
    ];
    this.cocomoModes = [
      {name: 'Organic', mode: 'organic'},
      {name: 'Semi Detached', mode: 'semiDetached'},
      {name: 'Detached', mode: 'detached'}
    ]
    this.cocomoService.getRatingNamesByCategory('productAttributes').subscribe((res: KeyValue<string, string>[]) => {
      if(res){
        this.productCocomoFields = res;
      }
    });
    this.cocomoService.getRatingNamesByCategory('hardwareAttributes').subscribe((res: KeyValue<string, string>[]) => {
      if(res){
        this.hardwareCocomoFields = res;
      }
    });
    this.cocomoService.getRatingNamesByCategory('personnelAttributes').subscribe((res: KeyValue<string, string>[]) => {
      if(res){
        this.personnelCocomoFields = res;
      }
    });
    this.cocomoService.getRatingNamesByCategory('projectAttributes').subscribe((res: KeyValue<string, string>[]) => {
      if(res){
        this.projectCocomoFields = res;
      }
    });
  }

  calculate(): void {
    this.cocomoService.calculateCOCOMO(this.cocomo).toPromise().then((res: CocomoResponse) => {
      if(res){
        this.cocomoResults = res;
        this.collapseAll();
        this.messageService.add({key: 'global', severity:'success', summary: 'COCOMO Calculated', detail: 'The requested COCOMO results have been calculated.'})
      }else{
        this.messageService.add({key:'global', severity:'error', summary: 'COCOMO Not Calculated', detail: 'The requested COCOMO could not be calculated. Please review the COCOMO and try to resubmit.'})
      }
    });
  }

  reset(): void {
    this.cocomo = new CocomoRequest();
    this.cocomoResults = undefined;
    this.expandAll();
    window.scroll(0,0);
    this.messageService.add({key: 'global', severity:'info', summary: 'COCOMO Reset', detail: 'The COCOMO form has been reset.'})
  }

  collapseAll(): void{
    this.collapse = true;
  }
  expandAll(): void{
    this.collapse = false;
  }
}
