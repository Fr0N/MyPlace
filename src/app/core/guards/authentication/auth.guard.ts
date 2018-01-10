import { AuthService } from './../../services/authentication/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import {
    Router, CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkIfLogged(state.url);
    }

    checkIfLogged(url: string) {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        this.authService.redirectUrl = url;
        this.router.navigate(["/login"]);
        return false;
    }
}