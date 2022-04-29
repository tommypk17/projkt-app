import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AuthService} from "../../../authentication/services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import User = firebase.User;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  navItems: MenuItem[] = [];
  settingItems: MenuItem[] = [];
  loggedIn: boolean = false;
  profileImage: string | null = '/assets/default-account-icon.svg';

  constructor(private authService: AuthService, public afAuth: AngularFireAuth) { }

  ngOnInit(): void {

    this.afAuth.user.subscribe((res: User | null) => {
      if(res && res.photoURL){
        this.profileImage = res.photoURL;
      }else{
        this.profileImage = '/assets/default-account-icon.svg';
      }
    })

    this.navItems = [
      {
        label:'Home',
        icon:'pi pi-home',
        routerLink:'/'
      },
      {
        label: 'Cocomo',
        icon: 'pi pi-box',
        routerLink:'/cocomo'
      }
    ];

    this.settingItems = [
      {
        label:'Settings',
        icon:'pi pi-cog',
        routerLink: '/settings'
      },
    ];

    this.afAuth.authState.subscribe((user) => {
      this.setLoginLogoutButton();
    });
    this.setLoginLogoutButton();

  }
  setLoginLogoutButton(): void {
    this.loggedIn = this.authService.isLoggedIn;
    if(!this.authService.isLoggedIn){
      this.settingItems[1] = {
        label: 'Login',
        icon: 'pi pi-sign-in',
        routerLink: '/auth/login'
      };
    }else{
      this.settingItems[1] = {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.SignOut();
        }
      };
    }
  }
}
