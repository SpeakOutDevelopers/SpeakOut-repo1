import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddEventPage } from '../add-event-page/add-event-page';
import { EventProvider } from '../../providers/event-provider';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  eventos: any;
  

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public eventProvider: EventProvider) {
    
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

}
