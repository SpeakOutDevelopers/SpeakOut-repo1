import { Usuario } from '../../commons/entities';
import { RegisterGenderPage } from '../register-gender/register-gender';
import { RegisterAgePage } from '../register-age/register-age';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterLanguagePage } from '../register-language/register-language';

/**
 * Generated class for the RegisterPhotoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-register-photo',
  templateUrl: 'register-photo.html',
})
export class RegisterPhotoPage {
  user: Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user");
  }
  passToLanguage(formData): void {
    if (formData.valid) {
       if (formData.value.photo == null) {
        return null;
      }

      this.user.img = "http://emprendeunblog.com/wp-content/uploads/2014/11/avatar.png";

      this.navCtrl.push(RegisterGenderPage, {
        user: this.user
      });
    }
  }

    ionViewDidLoad() {
      console.log('ionViewDidLoad RegisterPhotoPage');
    }

  }
