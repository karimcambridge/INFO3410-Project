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
    // Categories of tips
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
            <h2>{{t.category}}</h2>
            <!-- <p>{{t.tip}}</p> -->
        </ion-item>

        <ion-item *ngFor="let item of t['items']">
            {{tip.quote}}
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
      //array of tips to be displayed for each category of items  
      var tips = [ 
        {
            category: 'Food',
            tip: [
                { quote: 'Boil Cassava for 15 minutes.' },
                { quote: 'Body lotions'},
                { quote: 'Face Moisturizer' }
            ]
        },
        {
            category: 'Farming',
            tip: [
                { quote: 'Watermelons need to be watered everyday' },
                { quote: 'Body lotions'},
                { quote: 'Face Moisturizer' }
            ]
        },
        {
            category: 'Jewellery',
            tip: [
                { quote: 'Bend the wire at the end of the bracelet so that the beads do not fall off!' },
                { quote: 'Body lotions'},
                { quote: 'Face Moisturizer' }
            ]
        },
        {
            category: 'Body Care',
            tip: [
                { quote: 'Grade A organic shea butter is the best for making body lotion!' },
                { quote: 'Body lotions'},
                { quote: 'Face Moisturizer' }
            ]
        }

      ];
      this.t = tips[this.params.get('charNum')];
    }

    dismiss() {
        this.viewCtrl.dismiss();
      }
    //function to go back to the tips page
    goBack() {
        this.navCtrl.setRoot(TipsPage);
    }
    //function to close modal view
    closeModal() {
        this.navCtrl.pop();
    }

}
