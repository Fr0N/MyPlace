import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { authComponents } from './index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ...authComponents
    ],
    exports: [
        ...authComponents
    ]
    
})
export class AuthenticationModule {}