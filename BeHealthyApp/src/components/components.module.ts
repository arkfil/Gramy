import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleLoginComponent } from './google-login/google-login';

@NgModule({
	declarations: [GoogleLoginComponent],
  imports: [CommonModule, // <--- for angular directives
            BrowserModule,
            IonicModule  // <--- for ionic components
  ],
  exports: [GoogleLoginComponent],
})
export class ComponentsModule {}
