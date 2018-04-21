import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleLoginComponent } from '../../components/google-login/google-login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  signIn() {
    this.navCtrl.setRoot(GoogleLoginComponent);
  }

}
