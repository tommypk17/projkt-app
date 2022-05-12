import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CocomoResponse} from "../../../../shared/models/COCOMO";
import {AuthService} from "../../../../authentication/services/auth.service";

@Component({
  selector: 'app-cocomo-results',
  templateUrl: './cocomo-results.component.html',
  styleUrls: ['./cocomo-results.component.scss']
})
export class CocomoResultsComponent implements OnInit {

  @Input('cocomoResults') cocomoResults: CocomoResponse | undefined;
  @Output('save') save: EventEmitter<string> = new EventEmitter<string>();
  loggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn;
  }

  saveCocomo(nameToSave: string): void {
    this.save.emit(nameToSave);
  }

  invalidName(nameToSave: string): boolean {
    if(!nameToSave || nameToSave.trim() == '') return true;
    else return false;
  }
}
