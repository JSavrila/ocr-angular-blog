import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    // vérirfier si authentifié
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(
        (user) => {
          if(user) {
            resolve(true)
          }
          else { 
            // si non-authentifié, rediriger vers signin pour s'authentifier
            this.router.navigate(['/signin'])
            reject(false)
          }
        }
      )
    })
  }
}
