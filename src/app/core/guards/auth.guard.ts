import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUser();

        if (currentUser && currentUser.CompanyID === 2) {
            // logged in so return true
            return true;
        }
        this.authenticationService.logout();
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login']);
        // this.router.navigate(['/account/login']);
        return false;
    }
}
