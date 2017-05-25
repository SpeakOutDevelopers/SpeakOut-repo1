import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { RegisterNamePage } from '../register-name/register-name';
import { LoginPage } from '../login-page/login-page';
import { Slides } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';
import {CentralController} from '../../controllers/central.controller';

/**
 * Generated class for the IntroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  @ViewChild('slides') slides: Slides;

  images = [
    'https://s-media-cache-ak0.pinimg.com/736x/30/6f/8b/306f8b543809aa6eb7839a27812d8b50.jpg',
    'http://www.joelfloraphotography.com/wp-content/uploads/2016/01/1452052623-400x400.jpg',
    'https://68.media.tumblr.com/afa0c34cca805e9e79d0e76cc5681379/tumblr_onbo3aA9tV1re67v3o1_400.jpg',
    'https://images.8tracks.com/cover/i/008/562/610/Bad_Bitch-4914.jpg?rect=42,0,400,400&q=98&fm=jpg&fit=max'
  ]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,   
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private fb: Facebook,
    public CC: CentralController
    ) {
  }
  ionViewDidLoad(){
    this.slides.autoplay = 5000;
  }
  login(){
    console.log("login");
    this.navCtrl.push(LoginPage);
  }
  loginFB(){
    //console.log("facebook");
    //this.CC.showAlert("fb");

    if (this.platform.is('cordova')) {
      //alert("cordova");

      this.fb.login(['email', 'public_profile']).then(res => {
          
          //alert("login");
          this.CC.showAlert("response: "+JSON.stringify(res));

          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInWithCredential(facebookCredential)
            .then((success) => {
              this.CC.showAlert(JSON.stringify(success));
            })
            .catch((error) => {
              this.CC.showAlert("error auth: "+JSON.stringify(error));
          });
      }, (err) => {
          this.CC.showAlert("error login: "+ JSON.stringify(err));
          console.log(err);
          
      });
      
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => console.log(res));
    }
  }
  
  crearCuenta(){
    console.log("cuenta");
    this.navCtrl.push(RegisterNamePage);
  }



}
