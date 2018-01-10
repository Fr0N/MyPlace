import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { sharedComponents } from './index';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule.forRoot()
    ],
    declarations: [
        ...sharedComponents
    ],
    exports: [
        ...sharedComponents
    ]
})
export class SharedModule {}