import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
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
  isLoggedIn: boolean = !!localStorage.getItem('loggedIn') || false;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {
              //private router: Router) {
    this.user = this.afAuth.authState.switchMap(user => {
        if(user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }
    })

    this.afAuth.authState.subscribe(res => {
      this.isLoggedIn = (res && res.uid) ? true : false;
      localStorage.setItem("loggedIn", this.isLoggedIn.toString());
    });
    console.log("[AUTH SERVICE] logged in? " + this.isLoggedIn);
  }

  get isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  signOut() {
    localStorage.removeItem("loggedIn");
    this.afAuth.auth.signOut();//.then(() => {
        //this.router.navigate(['/']);
    //});
  }

  login(credentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((credential) => {
        var user = firebase.auth().currentUser;
        this.populateUserDefaults(user);
        this.updateUser(user, { display_name: credentials.display_name })
        this.updateUser(user, { first_name: credentials.first_name })
        this.updateUser(user, { last_name: credentials.last_name })
      })
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credentials) => {
        console.log(credentials);
        if(credentials.additionalUserInfo.isNewUser == true) {
          console.log("Updating google plus data");
          this.populateUserDefaults(credentials.user);
          this.updateUser(credentials.user, { display_name: credentials.user.displayName });
          this.updateUser(credentials.user, { photo_url: credentials.user.photoURL })
        } else {
          console.log("Google plus data already populated");
        }
      })
  }

  updateUser(user: User, data: any) { 
    return this.afs.doc(`users/${user.uid}`).update(data)
  }

  private populateUserDefaults(user) {
    // Sets user data to firestore on signup

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    let date = new Date();

    const data: User = {
      uid: user.uid,
      email: user.email,
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      display_name: user.display_name || '',
      registration_date: date.toDateString(),
      photo_url: 'https://melodics.com/account/img/blank-profile-picture.png'
    }
    return userRef.set(data, { merge: true })
  }

  public addVendor(user, data) {
    // Sets user data to firestore on signup

    const vendorRef: AngularFirestoreDocument<any> = this.afs.doc(`vendors/${user.uid}`);

    const dataDoc = {
      uid: user.uid || '',
      tel: data.tel || '',
      email: data.category || '',
      first_name: data.quote || ''
    }
    return vendorRef.set(dataDoc, { merge: true })
  }

}