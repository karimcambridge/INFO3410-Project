import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { VendorPage } from '../vendor/vendor';
import { TipsPage } from '../tips/tips';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
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

  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      if(!this.platform.is('mobile')) {
        //this.tabsPlacement = 'top';
        this.tabsLayout = 'icon-left';
      }
    });
  }
}
