import { Pro } from '@ionic/pro';
import { NgModule, ErrorHandler, Injectable, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
//import { Routes, RouterModule } from '@angular/router';
import { IonicApp, IonicModule, IonicErrorHandler, Nav } from 'ionic-angular';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { VendorPage } from '../pages/vendor/vendor';
import { TipsPage } from '../pages/tips/tips';
import { AccountPage } from '../pages/account/account';
import { VendorFormPage } from '../pages/vendorForm/vendorForm';
import { ListVendorPage, ModalContentPage } from '../pages/vendorList/vendorList';
import { ModalContentPage2 } from '../pages/tips/tips';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { EmailComposer } from '@ionic-native/email-composer';
//import { Calendar } from '@ionic-native/calendar';

import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './core/auth.service';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/auth.guard';
import { Component, ViewChild } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
import { CalendarModule } from 'ionic3-calendar-en';

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

/*const routes: Routes = [
  { path: 'home', component: HomePage,  canActivate: [AuthGuard] },
];*/

@Injectable() // DON'T TOUCH THIS
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure IonicErrorHandler has been added to the providers list below
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
    TabsPage,
    LoginPage,
    SignupPage,
    AccountPage,
    HomePage,
    AboutPage,
    ContactPage,
    VendorPage,
    TipsPage,
    VendorFormPage,
    ListVendorPage,
    ModalContentPage,
    ModalContentPage2
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    CoreModule,
    NgxErrorsModule,
    CalendarModule//,
    //RouterModule.forRoot(routes, {useHash: true})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    SignupPage,
    AccountPage,
    HomePage,
    AboutPage,
    ContactPage,
    VendorPage,
    TipsPage,
    VendorFormPage,
    ListVendorPage,
    ModalContentPage,
    ModalContentPage2
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Device,
    Nav,
    GooglePlus,
    IonicErrorHandler,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuthModule,
    AuthService,
    AuthGuard,
    EmailComposer//,
    //RouterModule
  ]
})
export class AppModule {}
