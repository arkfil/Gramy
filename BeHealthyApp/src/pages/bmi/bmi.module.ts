import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BmiPage } from './bmi';

@NgModule({
  declarations: [
    BmiPage,
  ],
  imports: [
    IonicPageModule.forChild(BmiPage),
  ],
})
export class BmiPageModule {}
