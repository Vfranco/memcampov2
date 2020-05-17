import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { TopComponent } from './top/top.component';
import { MenuComponent } from './menu/menu.component';
import { NavloginComponent } from './navlogin/navlogin.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SearchoptionsComponent } from './searchoptions/searchoptions.component';
import { CardLoaderComponent } from './card-loader/card-loader.component';

@NgModule({
	declarations: [
		TopComponent,
		MenuComponent,
		NavloginComponent,
		FooterComponent,
		SidebarComponent,
		ToolbarComponent,
		SearchoptionsComponent,
		CardLoaderComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		NgxSkeletonLoaderModule
	],
	exports: [
		TopComponent, 
		MenuComponent, 
		NavloginComponent,
		FooterComponent, 
		SidebarComponent,
		ToolbarComponent,
		SearchoptionsComponent,
		CardLoaderComponent
	]
})
export class SharedModule { }
