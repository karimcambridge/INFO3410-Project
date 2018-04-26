import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';

import { AuthService } from './core/auth.service';
import { FcmProvider } from '../providers/fcm/fcm';
import { ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild(Nav) nav: Nav;

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              splashScreen: SplashScreen,
              private authService: AuthService,
              fcm: FcmProvider,
              toastCtrl: ToastController) {
    platform.ready().then(() => {

      // Get a FCM token
      fcm.getToken(authService.getUser())

      // Listen to incoming messages
      fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          const toast = toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      ).subscribe()
    });
  }

  login() {
    this.authService.signOut();
    this.nav.setRoot(LoginPage);
  }

  logout() {
    this.authService.signOut();
    this.gotoHomePage();
  }

  gotoHomePage() {
    this.nav.setRoot(HomePage);
  }
}
