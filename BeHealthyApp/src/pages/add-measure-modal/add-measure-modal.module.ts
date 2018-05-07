import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMeasureModalPage } from './add-measure-modal';

@NgModule({
  declarations: [
    AddMeasureModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMeasureModalPage),
  ],
})
export class AddMeasureModalPageModule {}
