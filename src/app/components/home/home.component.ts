import { AdvertisementService } from './../../core/services/advertisement/advertisement.service';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    adWithPicture = [];

    constructor(
        private advertisementService : AdvertisementService
    ){}

    ngOnInit(){
        this.advertisementService.getAdsForHomePage()
        .subscribe(
            data => {
                for(let d of data) {
                    this.advertisementService.getOnePictureByAdId(d._id)
                    .subscribe(
                        dataa => {
                            // console.log(dataa)
                            this.adWithPicture.push({
                                "adTitle" : d.title,
                                "adPrice" : d.price,
                                "adPictureUrl" : dataa[0]._downloadURL
                            })
                        }
                    )
                }
            }
        )
    }
}