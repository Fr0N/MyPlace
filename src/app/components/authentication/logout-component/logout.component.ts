import { AuthService } from './../../../core/services/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: ''
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router : Router
  ) { }

  ngOnInit() {
    this.authService.logout()
      .subscribe(data => {
        localStorage.clear();
        this.router.navigate(['/login']);
      })
  }
}