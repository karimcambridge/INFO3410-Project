import { Component } from '@angular/core'; // ViewChild
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  //@ViewChild('feedbackText') feedbackText;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, params: NavParams) {

  }

  submitFeedback() { //this method is responsible for alerting the user after they have posted a comment 
    alert("Your feedback has been duley noted!"); 
    //this.feedbackText = "";
  }

}
