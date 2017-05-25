import { Usuario } from '../../commons/entities';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RegisterGenderPage } from '../register-gender/register-gender';
import { RegisterPasswordPage } from '../register-password/register-password';
import { EventProvider } from '../../providers/event-provider';
import { isNumeric } from "@angular/common/src/pipes/number_pipe";

/**
 * Generated class for the RegisterNamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-register-name',
  templateUrl: 'register-name.html',
})
export class RegisterNamePage {

  user: Usuario = {
    nombre:"",
    genero:"",
    universidad:"",
    edad:0,
    email:"",
    img:"",
    idiomas:[],
    $key:"",
    biografia:"",
    tipoAutenticacion:"simple",
    contrasena:""
  };

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams) {
  }
  passToGender(formData): void {
    if (formData.valid) {
     
      if (formData.value.first_name == ""||formData.value.first_name == null) {
        return null;
      }
       if (formData.value.last_name == ""||formData.value.last_name == null) {
        return null;
      }
      this.user.nombre = formData.value.first_name+" "+formData.value.last_name;
    };

    this.navCtrl.push(RegisterPasswordPage, {
      user: this.user
    });
  }


  }
