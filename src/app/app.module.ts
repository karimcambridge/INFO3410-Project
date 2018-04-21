import { Pro } from '@ionic/pro';
import { NgModule, ErrorHandler, Injectable, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { VendorPage } from '../pages/vendor/vendor';
//import { SignInPage } from '../pages/sign-in/sign-in';
import { TabsPage } from '../pages/tabs/tabs';
import {VendorFormPage} from '../pages/vendorForm/vendorForm';
import {ListVendorPage} from '../pages/listVendors/listVendors';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseProvider } from '../providers/firebase/firebase';

import { GooglePlus } from '@ionic-native/google-plus';

Pro.init('810dcd48', { // DON'T TOUCH THIS
  appVersion: '0.0.1'
})

const firebaseConfig = { // DON'T TOUCH THIS
  apiKey: "AIzaSyBMSsCs7VYro0hyNF6c2_0sK46Yn0B65_s",
  authDomain: "ask-jz.firebaseapp.com",
  databaseURL: "https://ask-jz.firebaseio.com",
  projectId: "ask-jz",
  storageBucket: "ask-jz.appspot.com",
  messagingSenderId: "778757169371"
};

@Injectable() // DON'T TOUCH THIS
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    VendorPage,
    //SignInPage,
    TabsPage,
    VendorFormPage,
    ListVendorPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
    // IonicModule.forRoot(MyApp) , {}, {
    //   links: [
    //     { component: SignInPage, name: 'SignInPage', segment: 'sign-in' }
    //   ]
    // })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    VendorPage,
    //SignInPage,
    TabsPage,
    VendorFormPage,
    ListVendorPage
  ],
  providers: [
  GooglePlus,
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    IonicErrorHandler,
    [{provide: ErrorHandler, useClass: IonicErrorHandler}]
  ]
})
export class AppModule {}
