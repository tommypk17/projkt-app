import {Injectable, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {MessageService} from "primeng/api";
import User = firebase.User;
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
    private ngZone: NgZone,
    private messageService: MessageService,
  ) {  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  // Sign in with Microsoft
  SignInMicrosoft() {
    const provider = new firebase.auth.OAuthProvider('microsoft.com');
    provider.setCustomParameters({
      tenant: '7ed58c97-182b-47b2-b635-e2b8790f2728'
    });
    return this.afAuth
      .signInWithPopup(provider)
      .then(() => {
        this.messageService.add({key: 'global', severity: 'success', summary: 'Sign In Successful', detail: 'You have been signed in.'});
      })
      .catch((err) => {
        this.messageService.add({key: 'global', severity: 'error', summary: 'An error occurred on login', detail: 'You have not been signed in.'})
      });
  }

  // Sign in with Google
  SignInGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth
      .signInWithPopup(provider)
      .then(() => {
        this.messageService.add({key: 'global', severity: 'success', summary: 'Sign In Successful', detail: 'You have been signed in.'});
      })
      .catch((err) => {
        this.messageService.add({key: 'global', severity: 'error', summary: 'An error occurred on login', detail: 'You have not been signed in.'})
      });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.messageService.add({key: 'global', severity: 'success', summary: 'Sign Out Successful', detail: 'You have been signed out.'})
      this.router.navigate(['']);
    });
  }
}
