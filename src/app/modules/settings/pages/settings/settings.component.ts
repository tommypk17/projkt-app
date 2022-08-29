import { Component, OnInit } from '@angular/core';
import {AuthService, UserProfile} from "../../../../authentication/services/auth.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  loggedIn: boolean = false;
  profile: UserProfile | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn;
    this.profile = this.authService.userProfile;
  }

}
