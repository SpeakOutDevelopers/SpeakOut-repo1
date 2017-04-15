import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
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
    public af: AngularFire,    
    public userProvider:UserProvider,
    public CC: CentralController
    ) {
      this.af.auth.subscribe(auth => { 
              
        if(auth) {
            console.log("Auntenticado");
            this.userProvider.setCurrentUser(auth.uid);
            this.navCtrl.push(TabsPage);
        }else{
            console.log("No Auntenticado");
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
        this.af.auth.login({
            email: this.user.email,
            password: this.user.password,
        },
        {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
        }).then(
            (success) => {
                this.userProvider.setCurrentUser(success.uid);
                console.log(success);
                this.navCtrl.push(TabsPage);
            }
        ).catch(
            (err) => {
            this.error = err;
            this.CC.showAlert(err.message);
        })
    }
    signUp(){
    this.navCtrl.push(SignupPage);
  }

}
