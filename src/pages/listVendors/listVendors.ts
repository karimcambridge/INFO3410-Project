import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { VendorPage } from '../vendor/vendor';

@Component({
  selector: 'page-listVendors',
  templateUrl: 'listVendors.html'
})
export class ListVendorPage {
  vendors;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.initializeVendors();
  }

  openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();
  }

  goBack() {
    this.navCtrl.setRoot(VendorPage);
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

@Component({
  templateUrl: 'modal-content.html'
})
export class BasicPage {
  constructor(public modalCtrl: ModalController) { }

  openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();
  }
}


@Component({
  template: `
  <ion-header>
  <ion-toolbar>
      <ion-title>Description</ion-title>
      <ion-buttons start>
      <button ion-button (click)="dismiss()">
          <span ion-text color="primary" showWhen="ios">Cancel</span>
          <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
      </button>
      </ion-buttons>
  </ion-toolbar>
  </ion-header>
  
  <ion-content>
  <ion-list>
      <ion-item>
          <ion-avatar item-start>
          <img src="{{vendor.image}}">
          </ion-avatar>
          <h2>{{vendor.name}}</h2>
          <p>{{vendor.quote}}</p>
      </ion-item>
  
      <ion-item *ngFor="let item of vendor['items']">
          {{item.title}}
      </ion-item>
  </ion-list>
</ion-content>
`
})
export class ModalContentPage {
  vendor;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    var vendors = [
      {
        name: 'Anna Breton',
        quote: 'I sell food!',
        image: 'assets/img/avatar-gollum.jpg',
        items: [
          { title: 'Doubles' },
          { title: 'Alloo Pie' }
        ]
      },
      {
        name: 'Brittney Chriton',
        quote: 'I sell jewellery!',
        image: 'assets/img/avatar-frodo.jpg',
        items: [
          { title: 'Bracelets' },
          { title: 'Earrings' },
          { title: 'Necklaces' }
        ]
      },
      {
        name: 'Justin Maxime',
        quote: 'I sell soap!',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Lavender'},
          { title: 'Tea Tree' },
          { title: 'Shea Butter' }
        ]
      },
      {
        name: 'Karim Cambridge',
        quote: 'I sell spices',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Cinnamon'},
          { title: 'Nutmeg'},
          { title: 'Curry' }
        ]
      },
      {
        name: 'Louis Scott',
        quote: 'I sell produce local juices',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Lime' },
          { title: 'Passion Fruit' },
          { title: 'Sorrel' }
        ]
      },
      {
        name: 'Ronald Browne',
        quote: 'I sell pottery!',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Vases' },
          { title: 'Plates' },
          { title: 'Mugs' }
        ]
      },
      {
        name: 'Sade Bowman',
        quote: 'I sell organic skincare products!',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Face soaps' },
          { title: 'Body lotions'},
          { title: 'Face Moisturizer' }
        ]
      },
      {
        name: 'Xia Crawford',
        quote: 'I sell food!',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Curry Goat'},
          { title: 'Sweet Bread'},
        ]
      },
      {
        name: 'Zaria Grant',
        quote: 'I sell jewellery!',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Anklets'},
          { title: 'Nose rings' },
          { title: 'Toe rings' }
        ]
      }
    ];
    this.vendor = vendors[this.params.get('charNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}


