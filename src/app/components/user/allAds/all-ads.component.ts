import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { AdvertisementService } from './../../../core/services/advertisement/advertisement.service';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './all-ads.component.html'
})
export class AllAdsComponent implements OnInit{
    adsTitles: string[];

    constructor(
        private advertisementService : AdvertisementService,
        private router : Router,
        private toastr: ToastsManager
    ) {}

    getAdsTitles() {
        this.advertisementService.getCurrentUserAdsTitles()
        .subscribe(
            data => {
                this.adsTitles = data;
            },
            err => {
                this.router.navigate(['/home']);
                this.toastr.error('There was an error while processing your request, please try again!');
            }
        )
    }   

    ngOnInit() {
        this.getAdsTitles();
    }
}