import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  navItems: MenuItem[] = [];
  settingItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {

    this.navItems = [
      {
        label:'Home',
        icon:'pi pi-home',
      },
      {
        label: 'Cocomo',
        icon: 'pi pi-box'
      }
    ];

    this.settingItems = [
      {
        label:'Settings',
        icon:'pi pi-cog',
      }
    ];

  }

}
