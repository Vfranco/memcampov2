import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private localstorage: LocalstorageService, private router: Router, private fireabse: AngularFireAuth){}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		let getAuthUser = this.localstorage.read('authUser');

		if(getAuthUser == null || getAuthUser == undefined)
			return false;
		else if (this.fireabse.auth.currentUser == null)
			return false;
		
		return true;
	}
}
