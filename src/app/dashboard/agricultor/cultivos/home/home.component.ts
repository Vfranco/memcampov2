import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { collections } from 'src/app/constants/constants';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	preloadData :boolean = false;
	cultivosData : any = [];

	constructor(private firestore: FirebaseService, private route: ActivatedRoute) { }

	ngOnInit() { 
		this.route.params.subscribe(data => {
			this.getResumenCultivos(data.uid)
		})
	}

	getResumenCultivos(uid){
		this.preloadData = true;

		this.firestore.readCollectionByUserId(collections.CULTIVOS, uid).subscribe(data => {
			//this.cultivosData = data;
			this.preloadData = false;
		});		
	}
}
