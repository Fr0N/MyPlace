import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    constructor(
        private http : HttpClientService
    ) {}

    getUserById(id) {
        return this.http.get("user", id, "Guest");
    }
}