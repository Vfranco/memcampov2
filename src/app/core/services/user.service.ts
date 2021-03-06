import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';

@Injectable()
export class UserService {

	constructor(private localstorage: LocalstorageService) { }

	getUIDFromStorage() {
		return this.localstorage.read('authUser').uid;
	}

	getRolUser() {
		return this.localstorage.read('authUser').rol;
	}
}
