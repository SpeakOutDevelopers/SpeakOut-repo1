import { Usuario } from '../../commons/entities';
import { RegisterGenderPage } from '../register-gender/register-gender';
import { RegisterAgePage } from '../register-age/register-age';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RegisterLanguagePage } from '../register-language/register-language';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  public photos: any;
  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private alertCtrl: AlertController) {
    this.user = this.navParams.get("user");
    this.photos = [];
  }
  takePhoto() {
    let options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
      console.log(this.photos.length);
    }, (err) => {
      // Handle error
    });
  }
  pickFromGallery() {
    let options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
      console.log(this.photos.length);
    }, (err) => {
      // Handle error
    });


  }
  deletePhoto(index) {
    let alert = this.alertCtrl.create({
      title: '¿Está seguro de eliminar esta foto?',
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.photos.splice(index, 1);
          }
        }
      ]
    });
    alert.present();


  }
  passToLanguage(): void {
    if (this.photos[0] == null) {
      return null;
    }
    this.user.img = this.photos[0];
    console.log(this.user.img);
    this.navCtrl.push(RegisterGenderPage, {
      user: this.user
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPhotoPage');
  }

}
