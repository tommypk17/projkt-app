import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {
  public loading: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.loading.subscribe((res: boolean) => {
      if(res){
        this.loading = true;
      }else{
        this.loading = false;
      }
    });
  }

}
