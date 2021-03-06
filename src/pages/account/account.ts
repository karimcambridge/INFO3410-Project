import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../app/core/auth.service';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthService) {
    console.log("[ACCOUNT] logged in? " + this.authService.isLoggedIn);
  }

  gotoLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  logout() {
    this.authService.signOut();
    this.navCtrl.setRoot(HomePage);
  }
}