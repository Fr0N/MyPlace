import { UserService } from './../../../../core/services/user/user.service';
import { AdvertisementService } from './../../../../core/services/advertisement/advertisement.service';
import { RentalAdModel } from './../../../../core/models/rentalAd.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './advertisement-details.component.html'
})
export class AdvertisementDetailsComponent implements OnInit{
    
    model = {};
    pictures = [];

    constructor(
        private route: ActivatedRoute,
        private advertisementService: AdvertisementService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.getAd();
    }

    getAd() {
        const id = this.route.snapshot.params['id'];
        this.advertisementService.getAdById(id)
            .subscribe(
                data => {
                    this.model = data;
                    this.getPicturesForAd(this.model);
                    this.getSellerInfo(this.model);
                },
                err => {
                    console.log(err)
                }
            );
    }

    getPicturesForAd(model) {
        this.advertisementService.getPicturesByAdId(model._id)
        .subscribe(
            pictureData => {
                this.pictures = pictureData
            },
            err => {
                console.log(err)
            }
        )
    }

    getSellerInfo(model) {
        let sellerId = model._acl.creator;
        this.userService.getUserById(sellerId)
            .subscribe(
                data =>{
                    model.sellerFirstName = data.firstName;
                    model.sellerLastName = data.lastName;
                    model.sellerPhoneNumber = data.phoneNumber;
                    model.sellerEmail = data.email;
                },
                err => {
                    console.log(err)
                }
            )
    }
}