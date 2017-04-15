import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventProvider {

  eventos: FirebaseListObservable<any>;
  idiomas: FirebaseListObservable<any>;
  ubicaciones: FirebaseListObservable<any>;

  constructor( public database: AngularFireDatabase) {
    console.log('Hello EventProvider Provider');

    this.eventos = this.database.list('/eventos');
    this.idiomas = this.database.list('/idiomas');
    this.ubicaciones = this.database.list('/ubicaciones');


  }
  createEvent(newEvent){
    console.log('Creating event');
    console.log(newEvent);
    this.eventos.push(newEvent);
  }

  getIdiomasObservable(){
    return this.idiomas;
  }
  getEventosObservable(){
    return this.eventos;
  }
  getUbicacionesObservable(){
    return this.ubicaciones;
  }

}
