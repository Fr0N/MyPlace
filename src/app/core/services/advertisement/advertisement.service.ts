import { RentalAdModel } from './../../models/rentalAd.model';
import { HttpClientService } from './../http-client.service';
import { RegisterModel } from './../../models/register.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LoginModel } from './../../models/login.model';
import { Injectable } from '@angular/core';

const baseUrl = "https://baas.kinvey.com/";
const appKey = "kid_Hy6tE-bNf";
let guestCredentials = btoa("pesho:pesho");

@Injectable()
export class AdvertisementService {

  constructor(
    private httpClientService: HttpClientService,
    private httpClient: HttpClient
  ) { }

  deleteAdById(id) {
    return this.httpClientService.delete("appdata", "RentalAdvertisement/" + id, "Kinvey");
  }

  getCurrentUserAdsTitles(){
    let userId = localStorage.getItem("userId");
    let query = `?query={"_acl":{"creator":"${userId}"}}&fields=title`;
    return this.httpClientService.get("appdata", "RentalAdvertisement" + query, "Kinvey")
  }

  getAdById(id) {
    return this.httpClientService.get("appdata", "RentalAdvertisement/" + id, "Guest")
  }

  getPicturesByAdId(id) {
    let query = `?query={"advertisementId":"${id}"}`;
    return this.httpClientService.get("blob", query, "Guest")
  }

  getOnePictureByAdId(id) {
    let query = `?query={"advertisementId":"${id}"}&fields=_downloadURL&limit=1`;
    return this.httpClientService.get("blob", query, "Guest")
  }

  getAdsForMainMap() {
    let queryModifiers = "?query={}&fields=title,price,lat,lng";
    return this.httpClientService.get("appdata", "RentalAdvertisement" + queryModifiers, "Guest")
  }

  getAdsForHomePage() {
    let queryModifiers = '?query={}&sort={"_kmd._ect": 1}&limit=5&fields=title,price';
    return this.httpClientService.get("appdata", "RentalAdvertisement" + queryModifiers, "Guest")
  }

  createRentalAd(data: RentalAdModel) {
    return this.httpClientService.post("appdata", "RentalAdvertisement", "Kinvey", JSON.stringify(data));
  }

  uploadPictures(files: File[], adId) {
    for (let file of files) {
      this.uploadPicture(file, adId);
    }
  }

  uploadPicture(file, adId) {

    let metadata = {
      '_filename': file.name,
      'size': file.size,
      'mimeType': file.type,
      "_public": true,
      "advertisementId": adId
    };

    let requestUrl = baseUrl + 'blob/' + appKey;

    let requestHeaders = new HttpHeaders({
      'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
      'Content-Type': 'application/json',
      'X-Kinvey-Content-Type': metadata.mimeType
    });

    this.httpClient.post(requestUrl, JSON.stringify(metadata), { headers: requestHeaders }).toPromise()
      .then((success) => {
        this.uploadToCloud(success, file)
      }
      )
  }

  uploadToCloud(success, file) {
    let innerHeaders = success._requiredHeaders;
    innerHeaders['Content-Type'] = file.type;
    innerHeaders = new HttpHeaders(innerHeaders);

    let uploadURL = success._uploadURL;
    let element_id = success._id;

    this.httpClient.put(uploadURL, file, { headers: innerHeaders }).toPromise()
      .then(() =>{})
  }
}
