import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopComponent } from './top/top.component';
import { MenuComponent } from './menu/menu.component';
import { NavloginComponent } from './navlogin/navlogin.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
	declarations: [
		TopComponent,
		MenuComponent,
		NavloginComponent,
		FooterComponent,
		SidebarComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		TopComponent, 
		MenuComponent, 
		NavloginComponent,
		FooterComponent, 
		SidebarComponent
	]
})
export class SharedModule { }
