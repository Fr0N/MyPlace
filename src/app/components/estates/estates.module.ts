import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageUploadModule } from "angular2-image-upload";
import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { estateComponents } from './index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ImageUploadModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA8viOj6h37c0bs2x0wjyYQuXjxjigeQkc'
        }),
        RouterModule,
        NgbModule
    ],
    declarations: [
        ...estateComponents
    ],
    exports: [
        ...estateComponents
    ]
})
export class EstateModule { }