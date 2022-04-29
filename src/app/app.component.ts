import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import User = firebase.User;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    /* Saving user data in localstorage when logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user: User | null) => {
      const temp: any = JSON.parse(JSON.stringify(user));
      if(temp != null){
        const {apiKey, appName, ...obfuscatedUser} = temp;
        if (obfuscatedUser) {
          localStorage.setItem('user', JSON.stringify(obfuscatedUser));
        } else {
          localStorage.setItem('user', 'null');
        }
      }else{
          localStorage.setItem('user', 'null');
      }
    });
  }

}
