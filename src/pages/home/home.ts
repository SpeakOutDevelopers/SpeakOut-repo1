import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddEventPage } from '../add-event-page/add-event-page';
import { EventProvider } from '../../providers/event-provider';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myDate: String = new Date().toISOString();

  testCheckboxOpen: boolean = true;
  testCheckboxResult: String = "";

  eventos: any;
  

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public eventProvider: EventProvider, public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController) {
    
    this.eventProvider.getEventosObservable().subscribe((eventos) => {
      this.eventos = eventos;
    });

  }

  addEvent(){
     let modal = this.modalCtrl.create(AddEventPage);

    modal.onDidDismiss(event => {
      if(event){
        this.eventProvider.createEvent(event);
      }
    });

    modal.present();
  }
   openDateFilter() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  openLanguageFilter() {
  
    let alert = this.alertCtrl.create();
    alert.setTitle('Idiomas que buscás');

    alert.addInput({
      type: 'checkbox',
      label: 'Idioma',
      value: 'value1',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Bespin',
      value: 'value2'
    });

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Filtrar',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present();
  }

}
