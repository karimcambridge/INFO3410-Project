import { Component } from '@angular/core';

import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';


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
  
      <ion-item *ngFor="let item of vendors['items']">
          {{vendor.title}}
          <ion-note item-end>
          {{item.note}}
          </ion-note>
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
          { title: 'bracelets' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Weapon', note: 'Sting' }
        ]
      },
      {
        name: 'Justin Maxime',
        quote: 'I sell soap!',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' }
        ]
      },
      {
        name: 'Karim Cambridge',
        quote: 'I sell spices',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' }
        ]
      },
      {
        name: 'Louis Scott',
        quote: 'I sell produce local juices',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' }
        ]
      },
      {
        name: 'Ronald Browne',
        quote: 'I sell pottery!',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' }
        ]
      },
      {
        name: 'Sade Bowman',
        quote: 'I sell organic skincare products!',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' }
        ]
      },
      {
        name: 'Xia Crawford',
        quote: 'I sell doubles!',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' }
        ]
      },
      {
        name: 'Zaria Grant',
        quote: 'I sell jewellery!',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' }
        ]
      }
    ];
    this.vendor = vendors[this.params.get('charNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}