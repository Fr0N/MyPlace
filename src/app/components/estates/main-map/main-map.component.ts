import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AdvertisementService } from './../../../core/services/advertisement/advertisement.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    templateUrl: './main-map.component.html',
    styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {
    
    lat: number = 0;
    lng: number = 0;
    zoom: number = 13;

    adMarkersForMap: Object[] = [];

    constructor(
        private advertisementService: AdvertisementService,
        private toastr: ToastsManager
    ) {
    }

    ngOnInit() {
        this.getLocation();
        this.advertisementService.getAdsForMainMap()
            .subscribe(
                data => {
                    this.adMarkersForMap = data;
                },
                err => {
                    console.log("error")
                    this.toastr.error('An error occurred while getting info for the map!');
                }
            )
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => this.showPosition(pos));
        } else {
            let position;
            position.coords.latitude = 0;
            position.coords.longitude = 0;
            this.showPosition(position)
        }
    }

    showPosition(position) {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
    }
}