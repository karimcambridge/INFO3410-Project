import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';
import { Platform } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { GooglePlus } from '@ionic-native/google-plus';
//import { first } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  registration_date?: string;
  photo_url?: string;
}

@Injectable()
export class AuthService {
  user: Observable<User>;
  //private userDetails: firebase.User;
  isLoggedIn: boolean = false;

  constructor(private platform: Platform,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private gplus: GooglePlus) {
              //private router: Router) {
    this.user = this.afAuth.authState.switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }
    })

    this.afAuth.authState.subscribe(res => {
      this.isLoggedIn = (res && res.uid) ? true : false;
    });
    console.log("[AUTH SERVICE] logged in? " + this.isLoggedIn);
  }

  get isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  /*authenticated(): boolean {
    return this.afAuth.authState.pipe(first()) !== Observable.of(null);
  }*/

  /*getEmail() {
    return this.user;// && this.user.email;
  }*/

  signOut() {
    this.afAuth.auth.signOut();//.then(() => {
        //this.router.navigate(['/']);
    //});
  }

  login(credentials) {
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  private updateUserData(user) {
    // Sets user data to firestore on signup

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const date = new Date();

    const data: User = {
      uid: user.uid,
      email: user.email,
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      display_name: user.display_name || '',
      registration_date: user.registration_date || date,
      photo_url: user.photo_url || 'https://melodics.com/account/img/blank-profile-picture.png'
    }
    return userRef.set(data, { merge: true })
  }

}