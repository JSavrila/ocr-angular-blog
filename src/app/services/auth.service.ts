import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor() { }

  userSignUp(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
          () => { resolve() },
          (error) => { reject() })
      } 
    )
  }

  userSignIn(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
          () => { resolve() },
          (error) => { reject(error) })
      }
    )
  }

  userSignOut() {
    firebase.auth().signOut()
  }

}