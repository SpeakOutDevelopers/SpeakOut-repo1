import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable , } from 'angularfire2/database';
import { CentralController } from '../controllers/central.controller';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

  currentUser: FirebaseObjectObservable<any>;
  user:any;
  userExistsSubject: Subject<any>;
  currentUserSubject: Subject<any>;
  userExists:boolean = false;

  constructor(
    public database: AngularFireDatabase,
    public CC: CentralController
    ) {
      console.log('Hello UserProvider Provider');
      this.userExistsSubject = new Subject();
      this.currentUserSubject = new Subject();
  }

    setCurrentUser(key){
      this.currentUser = this.database.object('/usuarios/'+key);
      this.currentUser.subscribe((user) => {
        this.user = user;
        console.log("user-provider current user: ",user);
        console.log();
        
        this.currentUserSubject.next(user);
        this.CC.dismissLoading();
      });

	}
  queryUserExists(key:string){
    this.database.object('/usuarios/'+key, { preserveSnapshot: true }).subscribe((user) => {
      alert("usuario existe: "+JSON.stringify(user));
      if(user!=null){
        this.userExists = true;
      }else{
        alert("El usuario no esta creado completamente");
      }
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

  checkUserExists():boolean{
    return this.userExists;
  }

  getUserExistsSubject():Subject<any>{
    return this.userExistsSubject;
  }
  updateCurrentUser(newUserData:any){
    this.currentUser.update(newUserData);
  }
  getCurrentUserSubject(): Subject<any>{
    return this.currentUserSubject;
  }

}
