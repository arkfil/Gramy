import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorsPage } from './authors';

@NgModule({
  declarations: [
    AuthorsPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthorsPage),
  ],
})
export class AuthorsPageModule {}
