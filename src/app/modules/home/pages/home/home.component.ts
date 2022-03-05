import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  xs: string[] = [];

  constructor() { }

  ngOnInit(): void {
    for(let i = 0; i < 10; i++){
      this.xs.push("string " + i);
    }
  }

}
