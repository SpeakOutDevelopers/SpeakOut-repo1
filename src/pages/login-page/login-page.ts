import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule  } from 'angularfire2';
import { AngularFireAuth,AngularFireAuthProvider,AUTH_PROVIDERS } from 'angularfire2/auth';

import { UserProvider } from '../../providers/user-provider';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup-page/signup-page';

import { CentralController } from '../../controllers/central.controller';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {

  error: any;
  user = {
    "email":"",
    "password":""
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public af: AngularFireAuth,    
    public userProvider:UserProvider,
    public CC: CentralController
    ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
      
    this.af.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
    ).then((success) => {
        //this.userProvider.setCurrentUser(success.uid);
        console.log(success);
    }, (err) => {
        this.error = err;
        this.CC.showAlert(err.message);
    });
        
        
        // ({
        //     email: this.user.email,
        //     password: this.user.password,
        // },
        // {
        // provider: AngularFireAuthProvider.provide,
        // method: AuthMethods.Password,
        // }).then(
        //     (success) => {
        //         this.userProvider.setCurrentUser(success.uid);
        //         console.log(success);
        //         //this.navCtrl.push(TabsPage);
        //     }
        // ).catch(
        //     (err) => {
        //     this.error = err;
        //     this.CC.showAlert(err.message);
        // })
    }
 

}
