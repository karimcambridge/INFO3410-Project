import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VendorFormPage } from '../vendorForm/vendorForm';

@Component({
  selector: 'page-vendor',
  templateUrl: 'vendor.html'
  //template: '<ion-nav [root]="rootPage"></ion-nav>'
})

export class VendorPage {

  constructor(public navCtrl: NavController) {

  }
  vendorform() {
    this.navCtrl.setRoot(VendorFormPage);
  }

}
