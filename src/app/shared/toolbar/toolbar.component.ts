import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

	rol:string = '';

	constructor(private user: UserService) { }

	ngOnInit() {
		setTimeout(() => {
			this.rol = this.user.getRolUser();
		}, 1000);	
	}

}
