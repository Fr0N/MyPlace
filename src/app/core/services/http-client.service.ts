import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

const baseUrl = "https://baas.kinvey.com/";
const appKey = "kid_Hy6tE-bNf";
const appSecret = "a7ce03136a1b41ccb10fe5745543c358";

@Injectable()
export class HttpClientService {

    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(
        private http: HttpClient
    ) { }

    get<T>(startpoint: string, endpoint: string, auth: string) {
        let url = this.createUrl(startpoint, endpoint);
        
        return this.http.get<T>(url, { headers: this.createAuthHeaders(auth)})
            .pipe(
            catchError(error => this.handleError(error))
            )

    }

    post<T>(startpoint: string, endpoint: string, auth: string, body: any) {
        let url = this.createUrl(startpoint, endpoint);

        return this.http.post<T>(url, body, { headers: this.createAuthHeaders(auth) })
            .pipe(
            catchError(error => this.handleError(error))
            )

    }

    put<T>(startpoint: string, endpoint: string, auth: string, body: any) {
        let url = this.createUrl(startpoint, endpoint);

        return this.http.put<T>(url, body, { headers: this.createAuthHeaders(auth) })
            .pipe(
            catchError(error => this.handleError(error))
            )

    }

    delete<T>(startpoint: string, endpoint: string, auth: string) {
        let url = this.createUrl(startpoint, endpoint);
        return this.http.delete<T>(url, { headers: this.createAuthHeaders(auth) })
    }

    private createAuthHeaders(type: string): HttpHeaders {
        if (type === 'Basic') {
            return new HttpHeaders({
                'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                'Content-Type': 'application/json'
            })
        } else if (type === "Kinvey") {
            return new HttpHeaders({
                'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                'Content-Type': 'application/json'
            })
        } else if (type === "UserBasic") {
            return new HttpHeaders({
                'Authorization': `Basic ${localStorage.getItem('authtoken')}`,
                'Content-Type': 'application/json'
            })
        } else {
            return new HttpHeaders({
                'Authorization': `Basic ${btoa(`guest:guest`)}`,
                'Content-Type': 'application/json'
            })
        }
    }

    private createUrl(startpoint: string, endpoint:string): string {
        return baseUrl + startpoint + '/' + appKey + '/' + endpoint;
    }

    private handleError(error: any) {
        return Observable.throw(new Error(error.message));
    }

}