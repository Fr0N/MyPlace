import { AuthService } from './../../../core/services/authentication/auth.service';
import { Component, DoCheck } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements DoCheck {

    public isLogged : boolean;
    public username : string;

    constructor(
        private authService : AuthService
    ) {}

    ngDoCheck() {
        this.isLogged = this.authService.isLoggedIn();
        this.username = localStorage.getItem("username");
    }

}