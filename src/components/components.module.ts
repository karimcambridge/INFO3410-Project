import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { HomePage } from '../pages/home/home';
@NgModule({
	declarations: [HomePage],
	imports: [
		CommonModule, // <--- for angular directives
		IonicModule  // <--- for ionic components
	],
	exports: [HomePage]
})
export class ComponentsModule {}
