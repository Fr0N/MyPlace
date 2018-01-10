import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { AdvertisementService } from './../../../../core/services/advertisement/advertisement.service';
import { RentalAdModel } from './../../../../core/models/rentalAd.model';
import { Component } from '@angular/core';

@Component({
    templateUrl: './create-rental-form.component.html'
})
export class CreateRentalFormComponent {

    public propertyTypes: string[] = [
        "apartment",
        "room",
        "house",
        "office",
        "penthouse",
        "store",
        "studio"
    ]

    public model: RentalAdModel;
    public pictures = [];

    constructor(
        private advertisementService: AdvertisementService,
        private router : Router,
        private toastr: ToastsManager
    ) {
        this.model = new RentalAdModel("", "", 0, "", "", "", 0, 0, "")
    }

    createAd() {
        if(this.model.address === "Location is invalid") {
            this.router.navigate(['/addRental']);
            this.toastr.error('The location you entered is invalid!');
        }
        this.advertisementService.createRentalAd(this.model)
            .subscribe(
            data => {
                let adId = data._id;
                this.advertisementService.uploadPictures(this.pictures, adId);
                this.router.navigate(['/map']);
                this.toastr.success('Advertisement uploaded successfully!', 'Success!');
            },
            err => {
                this.router.navigate(['/addRental']);
                this.toastr.error('An error occurred, please try again!');
            }
            )
    }

    getDataFromChild(event) {
        this.model.address = event.formattedAddress;
        this.model.lat = event.lat;
        this.model.lng = event.lng;
    }

    onUploadFinished(event) {
        this.pictures.push(event.file);
    }
    onRemoved(event) {
        this.pictures = this.pictures.filter(e => { e !== event.file });
    }
}