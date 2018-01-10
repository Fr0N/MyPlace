import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/authentication/auth.service';
import { LoginModel } from './../../../core/models/login.model';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {

    public model: LoginModel;
    public username: string;

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastsManager
    ) {
        this.model = new LoginModel("", "");
        this.username = "";
    }

    login(): void {
        this.authService.login(this.model)
            .subscribe(
            data => {
                this.successfulLogin(data);
            },
            err => {
                this.unsuccessfulLogin(err);
            }
            )
    }

    successfulLogin(data): void {
        this.authService.authtoken = data['_kmd']['authtoken'];
        localStorage.setItem('authtoken', data['_kmd']['authtoken']);
        localStorage.setItem('username', data['username']);
        localStorage.setItem('userId', data['_id']);
        this.router.navigate(['/home']);
        this.toastr.info('Welcome!');
    }

    unsuccessfulLogin(error): void {
        this.router.navigate(['/login']);
        this.toastr.error('Make sure username and password are correct', 'Error while logging in!');
    }

    ngOnInit() { }
}