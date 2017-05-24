import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { CentralController } from '../controllers/central.controller';


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
    public CC: CentralController
    ) {
      console.log('Hello UserProvider Provider');
  }

    setCurrentUser(key){
		this.currentUser = this.database.object('/usuarios/'+key);
		this.currentUser.subscribe(
			user => {
        this.CC.dismissLoading();
				this.currentUser = user;

				console.log(user);
			});

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
