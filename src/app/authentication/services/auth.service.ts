import {Injectable, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    private messageService: MessageService,
  ) {  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  SignIn() {
    return this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
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
