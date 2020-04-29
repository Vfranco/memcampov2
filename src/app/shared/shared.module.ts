import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TopComponent } from './top/top.component';
import { MenuComponent } from './menu/menu.component';
import { NavloginComponent } from './navlogin/navlogin.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SearchoptionsComponent } from './searchoptions/searchoptions.component';

@NgModule({
	declarations: [
		TopComponent,
		MenuComponent,
		NavloginComponent,
		FooterComponent,
		SidebarComponent,
		ToolbarComponent,
		SearchoptionsComponent
	],
	imports: [
		CommonModule,
		RouterModule
	],
	exports: [
		TopComponent, 
		MenuComponent, 
		NavloginComponent,
		FooterComponent, 
		SidebarComponent,
		ToolbarComponent,
		SearchoptionsComponent
	]
})
export class SharedModule { }
