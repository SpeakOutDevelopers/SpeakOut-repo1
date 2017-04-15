import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

  currentUser: FirebaseObjectObservable<any>;

  constructor(
    public database: AngularFireDatabase,
    ) {
      console.log('Hello UserProvider Provider');
  }

  setCurrentUser(uid){
  	this.currentUser = this.database.object('/usuarios/'+uid);
  }
  getCurrentUserObservable(){
    return this.currentUser;
  }
  isUserSet(): boolean{
      if(this.currentUser == null){
        return false;
      }else{
        return true;
      }
  }
  createUser(user,key){
		let newUser = this.database.object(`/usuarios/${key}`);
		newUser.update(user);
	}

  updateCurrentUser(newUserData:any){
    this.currentUser.update(newUserData);
  }

}
