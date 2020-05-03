import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	menuOptions :any = [];

	constructor(
		private route: ActivatedRoute, 
		private localstorage: LocalstorageService, 
		private firebase: FirebaseService,
		private userData: UserService) { }

	ngOnInit() {
		this.route.params.subscribe(uid => {
			this.setMenuOptionsUser(uid)
		});
	}

	setMenuOptionsUser(uid){
		this.firebase.readCollection('menuRoles').subscribe(result => {
			console.log(this.userData.getRolUser());
		});
	}

}
