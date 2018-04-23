import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-tips',
  templateUrl: 'tips.html'
})
export class TipsPage {
    tips;

    constructor(public navCtrl: NavController, 
        public modalCtrl: ModalController) {
    this.initializeTips();
}

openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalContentPage2, characterNum);
    modal.present();
  }

    initializeTips() {
        this.tips = [
        "Food Tips",
        "Farming Tips",
        "Jewellery Tips",
        "Body Care Tips"
        ];
    }
}

@Component({
templateUrl: 'modal-tips.html'
})
export class BasicPage {
constructor(public modalCtrl: ModalController) { }

openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalContentPage2, characterNum);
    modal.present();
}
}

@Component({
template: `
<ion-header>
  <ion-toolbar>
      <ion-title>Tips</ion-title>
      <ion-buttons start>
      <button ion-button color = "black" clear (click)="goBack()">Close</button>
      </ion-buttons>
  </ion-toolbar>
  </ion-header>
    
<ion-content>
    <ion-list>
        <ion-item>
            <h3>{{t.category}}</h3>
            <p>{{t.tip}}</p>
        </ion-item>
    </ion-list>
</ion-content> 
`
})

export class ModalContentPage2 {
    t;
  
    constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController,
      public navCtrl: NavController) {
      var tips = [
        {
            category: 'Food',
            tip: 'Boil Cassava for 15 minutes.'
        },
        {
            category: 'Farming',
            tip: 'Watermelons need to be watered everyday'
        },
        {
            category: 'Jewellery',
            tip: 'Bend the wire at the end of the bracelet so that the beads do not fall off!'
        },
        {
            category: 'Body Care',
            tip: 'Grade A organic shea butter is the best for making body lotion!'
        }

      ];
      this.t = tips[this.params.get('charNum')];
    }

    dismiss() {
        this.viewCtrl.dismiss();
      }
    
      goBack() {
        this.navCtrl.setRoot(TipsPage);
      }

}
