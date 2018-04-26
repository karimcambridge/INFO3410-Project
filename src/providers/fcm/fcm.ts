import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../../app/core/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FcmProvider {

  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform,
    private authService: AuthService
  ) {}

  // Get permission from the user
  async getToken(user) {
	  let token;

	  if(this.platform.is('android')) {
	    token = await this.firebaseNative.getToken()
	  } 

	  if(this.platform.is('ios')) {
	    token = await this.firebaseNative.getToken();
	    await this.firebaseNative.grantPermission();
	  } 
	  
	  return this.saveTokenToFirestore(user, token)
	}

  // Save the token to firestore
  private saveTokenToFirestore(user, token) {
	  if(!token) return;

	  const devicesRef = this.afs.collection('devices')

	  const docData = {
	    token,
	    userId: user.uid,
	  }

	  return devicesRef.doc(token).set(docData)
	}

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()
  }

}