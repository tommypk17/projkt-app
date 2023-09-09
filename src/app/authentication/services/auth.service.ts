import {inject, Injectable, NgZone} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
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

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.isLoggedIn) return true;
    else {
        this.router.navigate(['', 'auth', 'login'], {skipLocationChange: true});
        return false;
    }
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  // Returns user profile info
  get userProfile(): UserProfile | null {
    const user: UserProfile = UserProfile.parseFromString(localStorage.getItem('user'));
    return user;
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

export const LoginGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthService).canActivate(next, state);
}

export class UserProfile {
  public lastLoginAt?: Date;
  public email?: string;
  public displayName?: string;
  public photoURL?: string;
  public provider?: string;

  static parseFromString = (profile: string | null): UserProfile => {
    if(profile == null) return new UserProfile();
    let user: UserProfile = new UserProfile();
    let parsed: any;
    try{
      parsed = JSON.parse(profile);
    }catch{
      return user;
    }
    user.email = parsed.email;
    user.displayName = parsed.displayName;
    user.photoURL = parsed.photoURL? parsed.photoURL : '/assets/default-account-icon.svg';
    try{
      user.lastLoginAt = new Date(Number.parseInt(parsed.lastLoginAt));
    }catch{}
    try{
      user.provider = parsed.providerData[0]?.providerId;
    }catch{}
    return user;
  }
}
