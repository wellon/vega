import * as Raven from 'raven-js';
import { FormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';

import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app/app.component';
import { AppErrorHandler } from './app.error-handler';
import { VehicleService } from './services/vehicle.service';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';


Raven
.config('https://67f8836c69e742f68e61fd2753518daf@sentry.io/244376')
.install();

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'vehicles/new', component: VehicleFormComponent },
            { path: 'vehicles/:id', component: VehicleFormComponent },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers:[
        { provide: ErrorHandler, useClass: AppErrorHandler },
        VehicleService
    ]
})
export class AppModuleShared {
}
