import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '@app/core/services';
import { ActivatedRoute } from '@angular/router';
import { collections } from '@app/core/constants/constants';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	preloadData :boolean = false;
	cultivosCollections : any = [];

	constructor(private firestore: FirebaseService, private route: ActivatedRoute) { }

	ngOnInit() { 
		this.route.params.subscribe(data => {
			this.getResumenCultivos(data.uid)
		})
	}

	getResumenCultivos(uid){
		this.preloadData = true;

		this.firestore.readCollectionByUserId(collections.CULTIVOS, uid).subscribe(data => {
			console.log(data);
			this.cultivosCollections = data;			
			this.preloadData = false;
		});		
	}

	recibe(event){
		console.log(event);
	}
}
