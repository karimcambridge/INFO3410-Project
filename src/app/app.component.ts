import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from './core/auth.service';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { VendorPage } from '../pages/vendor/vendor';
import { TipsPage } from '../pages/tips/tips';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild(Nav) nav: Nav;
  //tabsPlacement: string = 'bottom';
  tabsLayout: string = 'icon-top';

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private auth: AuthService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available. Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(!this.platform.is('mobile')) {
        //this.tabsPlacement = 'top';
        this.tabsLayout = 'icon-left';
      }
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

  gotoAboutPage() {
    this.nav.setRoot(AboutPage);
  }

  gotoContactsPage() {
    this.nav.setRoot(ContactPage);
  }

  gotoVendorPage() {
    this.nav.setRoot(VendorPage);
  }

  gotoTipsPage() {
    this.nav.setRoot(TipsPage);
  }
}
