import { Component } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { VendorPage } from '../vendor/vendor';

@Component({
  selector: 'page-vendorList',
  templateUrl: 'vendorList.html'
})
export class ListVendorPage {
  vendors;

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController) {
    this.initializeVendors();
  }

  openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();
  }

  goBack() {
    this.navCtrl.setRoot(VendorPage);
  }

  initializeVendors() {
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
      <ion-buttons end>
        <button ion-button icon-only (click)="closeModal()">
          <ion-icon item-right name="ios-close-outline"></ion-icon>
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
  <button ion-button full (click)="sendEmail()">Send Email</button>
  
</ion-content>
`
})
export class ModalContentPage {
  vendor;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private emailComposer: EmailComposer) {
    var vendors = [
      {
        name: 'Anna Breton',
        quote: 'I sell food!',
        image: 'assets/imgs/Hugging.png',
        items: [
          { title: 'Doubles' },
          { title: 'Alloo Pie' }
        ]
      },
      {
        name: 'Brittney Crichton',
        quote: 'I sell jewellery!',
        image: 'assets/imgs/tongue.png',
        items: [
          { title: 'Bracelets' },
          { title: 'Earrings' },
          { title: 'Necklaces' }
        ]
      },
      {
        name: 'Justin Maxime',
        quote: 'I sell soap!',
        image: 'assets/imgs/relieved-face.png',
        items: [
          { title: 'Lavender'},
          { title: 'Tea Tree' },
          { title: 'Shea Butter' }
        ]
      },
      {
        name: 'Karim Cambridge',
        quote: 'I sell spices',
        image: 'assets/imgs/neutral-face.png',
        items: [
          { title: 'Cinnamon'},
          { title: 'Nutmeg'},
          { title: 'Curry' }
        ]
      },
      {
        name: 'Louis Scott',
        quote: 'I sell produce local juices',
        image: 'assets/imgs/money.png',
        items: [
          { title: 'Lime' },
          { title: 'Passion Fruit' },
          { title: 'Sorrel' }
        ]
      },
      {
        name: 'Ronald Browne',
        quote: 'I sell pottery!',
        image: 'assets/imgs/clown.png',
        items: [
          { title: 'Vases' },
          { title: 'Plates' },
          { title: 'Mugs' }
        ]
      },
      {
        name: 'Sade Bowman',
        quote: 'I sell organic skincare products!',
        image: 'assets/imgs/kiss.png',
        items: [
          { title: 'Face soaps' },
          { title: 'Body lotions'},
          { title: 'Face Moisturizer' }
        ]
      },
      {
        name: 'Xia Crawford',
        quote: 'I sell food!',
        image: 'assets/imgs/hearteyes.png',
        items: [
          { title: 'Curry Goat'},
          { title: 'Sweet Bread'},
        ]
      },
      {
        name: 'Zaria Grant',
        quote: 'I sell jewellery!',
        image: 'assets/imgs/skull.png',
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

  goBack1() {
    this.navCtrl.setRoot(ListVendorPage);
  }

  goBack() {
    this.navCtrl.setRoot(VendorPage);
  }

  closeModal() {
    this.navCtrl.pop();
}

  sendEmail() {
    let email = {
      to: 'vendor@example.com',
      cc: ' ',
      subject: 'Contact Vendor',
      body: ' ',
      isHtml: true
    };

    this.emailComposer.open(email);
  }
}


