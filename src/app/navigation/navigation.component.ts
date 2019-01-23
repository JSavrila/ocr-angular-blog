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
    // savoir quoi afficher dès l'initialisation du component
    this.isSignedIn()
  }

  // contenu à afficher selon status de l'utilisateur
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

  // déconnexion
  onSignOut() {
    this.authService.userSignOut()
    this.router.navigate(['/signin'])
  }

}
