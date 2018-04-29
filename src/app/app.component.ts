import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AuthService } from './core/auth.service';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild(Nav) nav: Nav;

  constructor(private platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private auth: AuthService,
              private push: Push,
              private alert: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if(this.platform.is('cordova')) {
        console.log('[CORDOVA]: ENABLED.');
        this.push.hasPermission()
          .then((res: any) => {
            if(res.isEnabled) {
              this.initPush();
              console.log('We have permission to send push notifications');
            } else {
              console.log('We do not have permission to send push notifications');
            }
          });
      } else {
        console.log('[CORDOVA]: NOT ENABLED.');
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

  initPush() {
    const options: PushOptions = {
       android: {
         senderID: '778757169371'
       },
       ios: {
           alert: 'true',
           badge: true,
           sound: 'false'
       },
       windows: {},
       browser: {
           pushServiceURL: 'http://push.api.phonegap.com/v1/push'
       }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification)

      let alert = this.alert.create({
          title: 'Notification Received!',
          message: notification.message,
          buttons: [
            {
              text: 'Thanks!',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        alert.present();
      }
    );

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}
