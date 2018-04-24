import { Component } from '@angular/core';
import { IonicPage, Platform } from 'ionic-angular';
import { AuthService } from '../../app/core/auth.service';
import { HomePage } from '../home/home'
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { VendorPage } from '../vendor/vendor';
import { TipsPage } from '../tips/tips';
import { AccountPage } from '../account/account';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = VendorPage;
  tab5Root = TipsPage;
  tab6Root = AccountPage;

  //tabsPlacement: string = 'bottom';
  tabsLayout: string = 'icon-top';

  constructor(public platform: Platform,
  			      private authService: AuthService) {
    this.platform.ready().then(() => {
      if(!this.platform.is('mobile')) {
        //this.tabsPlacement = 'top';
        this.tabsLayout = 'icon-left';
      }
    });
  }

}
