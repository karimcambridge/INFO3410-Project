import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email: string;
  first_name?: string;
  last_string?: string;
  display_name?: string;
  registration_date?: string;
  photo_url?: string;
}

@Injectable()
export class AuthService {
	user: Observable<User>; //private user: firebase.User;

	constructor(public afAuth: AngularFireAuth,
              private afs: AngularFirestore) {
              //private router: Router) {
		this.user = this.afAuth.authState.switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }
    })
	}

  authenticated() {
    return this.afAuth.authState.pipe(first());
  }

  getEmail() {
    return this.user;// && this.user.email;
  }

  signOut() {
    this.afAuth.auth.signOut();//.then(() => {
        //this.router.navigate(['/']);
    //});
  }

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
	}

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

	googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      first_name: user.first_name || '',
      last_string: user.last_string || '',
      display_name: user.display_name || '',
      registration_date: user.registration_date || '',
      photo_url: user.photo_url || ''
    }

    return userRef.set(data, { merge: true })

  }

}