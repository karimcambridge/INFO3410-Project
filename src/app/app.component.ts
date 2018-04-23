import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from './core/auth.service';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home'
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { VendorPage } from '../pages/vendor/vendor';
import { TipsPage } from '../pages/tips/tips';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  @ViewChild(Nav) nav: Nav;

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = VendorPage;
  tab5Root = TipsPage;

  constructor(private platform: Platform, private statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  login() {
    this.auth.signOut();
    this.nav.setRoot(LoginPage);
  }

  logout() {
    this.auth.signOut();
    this.gotoHomePage();
  }

  gotoHomePage() {
    this.nav.setRoot(HomePage);
  }
}
