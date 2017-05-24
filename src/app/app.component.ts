import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {FirebaseAuth} from 'angularfire2';
import { LoginPage } from '../pages/login-page/login-page';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { RegisterLanguagePage } from '../pages/register-language/register-language';
import { UserProvider } from '../providers/user-provider';
import { CentralController } from '../controllers/central.controller';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = IntroPage;

  constructor(
    platform: Platform,
    public auth: FirebaseAuth, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    public userProvider: UserProvider,
    public CC: CentralController
    ) {
    this.CC.presentLoading("Auntenticando");

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      const authObserver = auth.subscribe( user => {
        if (user) {
            this.rootPage = TabsPage;
            this.userProvider.setCurrentUser(user.uid);
        } else {
            this.CC.dismissLoading();
            this.rootPage = RegisterLanguagePage;
        }
      });
    });
  }
}
