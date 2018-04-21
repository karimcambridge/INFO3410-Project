import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-listVendors',
  templateUrl: 'listVendors.html'
})
export class ListVendorPage {
  vendors;

  constructor(navCtl: NavController) {
    this.initializeVendors();
    // this.vendors = params.data.vendors;
  }

  initializeVendors(){
    this.vendors = [
      "Anna Breton",
      "Brittney Chriton",
      "India Jones",
      "Justin Maxime",
      "Karim Cambridge",
      "Louis Scott",
      "Ronald Browne",
      "Sade Bowman",
      "Xia Crawford",
      "Zaria Grant"
    ];
  }

  getVendors(ev){
    this.initializeVendors();

    this.initializeVendors();
    // set val to the value of the ev target
    var val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.vendors = this.vendors.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
