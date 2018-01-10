import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RegisterModel } from './../../../core/models/register.model';
import { AuthService } from './../../../core/services/authentication/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {

    public model: RegisterModel;

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastsManager
    ) {
        this.model = new RegisterModel("", "", "", "", "", "", "");
    }

    register(): void {
        if (this.model.password === this.model.confirmPassword) {
            this.authService.register(this.model)
                .subscribe(
                data => {
                    this.successfulRegister(data);
                },
                err => {
                    this.unsuccessfulRegister(err);
                }
                )
        } else {
            this.router.navigate(['/register']);
            this.toastr.error('Passwords does not match!', 'Error!');
        }
    }

    successfulRegister(data): void {
        this.router.navigate(['/login']);
    }

    unsuccessfulRegister(err): void {
        this.router.navigate(['/register']);
        this.toastr.error('Аn error occurred while your registration was processed, please try again!');
    }
}