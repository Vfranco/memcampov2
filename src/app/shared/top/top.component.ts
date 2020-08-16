import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { LocalstorageService } from '@app/core/services';

@Component({
	selector: 'app-top',
	templateUrl: './top.component.html',
	styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

	constructor(private firebase: AngularFireAuth, private route: Router, private localstorage: LocalstorageService) { }

	ngOnInit() {
	}

	logout() {
		this.firebase.auth.signOut();
		this.localstorage.remove('authUser');
		this.route.navigate(['/']);
	}
}
