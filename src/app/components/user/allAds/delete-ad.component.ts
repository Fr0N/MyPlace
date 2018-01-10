import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AdvertisementService } from './../../../core/services/advertisement/advertisement.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    template: ''
})
export class DeleteAdComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private advertisementService: AdvertisementService,
        private router: Router,
        private toastr: ToastsManager
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];

        this.advertisementService.deleteAdById(id)
        .subscribe(
            data => {
                this.router.navigate(['/allAds']);
            }, err => {
                this.router.navigate(['/allAds']);
                this.toastr.error('There was an error while deleting your advertisement!');
            }
        )
    }
}