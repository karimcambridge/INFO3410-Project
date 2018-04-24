import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../app/core/auth.service';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  isLoggedIn: boolean = false;

  constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private afAuth: AngularFireAuth,
        public authService: AuthService) {
    this.afAuth.authState.subscribe(res => {
      this.isLoggedIn = (res && res.uid) ? true : false;
    });
  }

  gotoLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  logout() {
    this.authService.signOut();
    this.navCtrl.setRoot(HomePage);
  }
}
