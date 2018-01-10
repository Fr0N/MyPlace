import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'location-selector',
    templateUrl: './select-location.component.html',
    styleUrls: ['./select-location.component.css']
})
export class SelectLocationComponent implements OnInit {

    @Output() onMarkerAdded = new EventEmitter<Object>()
    
    selectedLocationMarker = null;
    formatterAddress = "";

    lat = 0;
    lng = 0;

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.getLocation();
    }

    mapClicked(event) {
        this.selectedLocationMarker = {
            lat: event.coords.lat,
            lng: event.coords.lng,
            draggable: true
        }

        this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.selectedLocationMarker.lat},${this.selectedLocationMarker.lng}&key=AIzaSyA8viOj6h37c0bs2x0wjyYQuXjxjigeQkc`)
            .subscribe(
                data => {
                    this.success(data)
                    this.sendFromChildToParent()
                },  
                err => {
                    this.formatterAddress = "Location is invalid"
                }
            )
    }

    sendFromChildToParent(){
        this.onMarkerAdded.emit({
            formattedAddress: this.formatterAddress,
            lat: this.selectedLocationMarker.lat,
            lng: this.selectedLocationMarker.lng
        })
    }

    success(data) {
        this.formatterAddress = data.results[0].formatted_address;
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => this.showPosition(pos));
        } else {
            console.log("NONE")
        }
    }

    showPosition(position) {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
    }
}