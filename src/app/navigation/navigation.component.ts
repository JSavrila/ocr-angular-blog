import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isAuthenticated: boolean

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isSignedIn()
  }

  isSignedIn() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(
        (user) => {
          if(user) {
            this.isAuthenticated = true
            resolve(true)
          }
          else { 
            this.isAuthenticated = false
          }
        }
      )
    })
  }

  onSignOut() {
    this.authService.userSignOut()
    this.router.navigate(['/signin'])
  }

}
