import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Platform, App } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { GooglePlus } from '@ionic-native/google-plus';
//import { first } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import { HomePage } from '../../pages/home/home';

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
  loginForm: FormGroup;
  loginError: string;
  navCtrl = this.app.getActiveNav();

	constructor(private app: App,
              private platform: Platform,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private gplus: GooglePlus,
              public fb: FormBuilder) {
              //private router: Router) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.afAuth.authState.subscribe(res => {
      this.isLoggedIn = (res && res.uid) ? true : false;
    });
    console.log("logged in? " + this.isLoggedIn);

		this.user = this.afAuth.authState.switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }
    })
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

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
	}

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

  login() {
    let data = this.loginForm.value;

    if(!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };
    this.signInWithEmail(credentials)
      //.then(
      //  () => this.navCtrl.setRoot(HomePage),
      //  error => this.loginError = error.message
      //);
  }

  async nativeGoogleLogin(): Promise<void> {
    try {

      const gplusUser = await this.gplus.login({
        'webClientId': '833083649643-snd72roi89uhcsc47me8l96j8tocamkk.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })

      return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))

    } catch(err) {
      console.log(err)
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.afAuth.auth.signInWithPopup(provider) // const credential = 
        //.then((credential) => {
        //  () => this.navCtrl.setRoot(HomePage)
        //});
      
    } catch(err) {
      console.log(err)
    }

  }

  googleLoginEx() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
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
      last_name: user.last_name || '',
      display_name: user.display_name || '',
      registration_date: user.registration_date || '',
      photo_url: user.photo_url || ''
    }

    return userRef.set(data, { merge: true })

  }

}