import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';
import { ReadKeyExpr } from '@angular/compiler';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	titleMenu : string = '';
	menuOptions :any = [];
	loadingSideBar:boolean = false;

	constructor(
		private route: ActivatedRoute, 
		private localstorage: LocalstorageService, 
		private firebase: FirebaseService,
		private userData: UserService) { }

	ngOnInit() {
		this.loadingSideBar = true;
		this.route.params.subscribe(uid => {
			this.setMenuOptionsUser(uid)
		});
	}

	setMenuOptionsUser(uid){
		this.firebase.readCollection('menuRoles').subscribe(result => {
			this.setMenuByRol(this.userData.getRolUser(), result);
		});
	}

	setMenuByRol(rol, menu){
		switch(rol){
			case '2':				
				this.titleMenu = menu[0].menuUser[0].main;
				this.menuOptions = menu[0].menuUser[0].options;
				this.loadingSideBar = false;
			break;
		}
	}
}
