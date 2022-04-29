import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../authentication/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn(provider: string): void {
    switch (provider){
      case 'microsoft':
        this.authService.SignInMicrosoft().then(() => {
          this.router.navigate(['/']);
        });
        break;
      case 'google':
        this.authService.SignInGoogle().then(() => {
          this.router.navigate(['/']);
        })
        break;
    }
  }
}
