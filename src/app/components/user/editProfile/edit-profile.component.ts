import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from './../../../core/services/user/user.service';
import { EditModel } from './../../../core/models/edit.model';
import { AuthService } from './../../../core/services/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {

    public model;
    public oldModel;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private router : Router,
        private toastr: ToastsManager
    ) {
        this.model = new EditModel("", "", "", "", "");
    }

    edit(): void {
        this.model.username = this.oldModel.username;
        this.authService.update(this.model, this.oldModel._id)
            .subscribe(
            data => {
                this.successfulEdit(data);
            },
            err => {
                this.unsuccessfulEdit(err);
            }
            )
    }

    successfulEdit(data): void {
        this.authService.authtoken = data['_kmd']['authtoken'];
        localStorage.setItem('authtoken', data['_kmd']['authtoken']);
        localStorage.setItem('userId', data['_id']);
        this.router.navigate(['/home']);
    }

    unsuccessfulEdit(err): void {
        this.router.navigate(['/home']);
        this.toastr.error('Аn error occurred while your edit was processed, please try again!');
    }

    ngOnInit() { 
        this.userService.getUserById(localStorage.getItem("userId"))
        .subscribe(
            data => {
                this.oldModel = data;
            }
        )
    }
}