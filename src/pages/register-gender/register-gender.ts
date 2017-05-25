import { Usuario } from '../../commons/entities';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterAgePage } from '../register-age/register-age';

/**
 * Generated class for the RegisterGenderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-register-gender',
  templateUrl: 'register-gender.html',
})
export class RegisterGenderPage {

  user: Usuario;
  token: any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user");
    this.token = this.navParams.get("token");

  }
  passToAge(gender): void {
    if (gender == null || gender == "") {
      return null;
    }
    this.user.genero = gender;

    this.navCtrl.push(RegisterAgePage, {
      user: this.user,
      token: this.token
    });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterGenderPage');

  }


}
