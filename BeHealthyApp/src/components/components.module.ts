import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
	declarations: [],
  imports: [CommonModule, // <--- for angular directives
            BrowserModule,
            IonicModule  // <--- for ionic components
  ],
  exports: [],
})
export class ComponentsModule {}
