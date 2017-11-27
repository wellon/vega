import * as Raven from 'raven-js';
import { FormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';

import { CommonModule } from '@angular/common';
import { HttpModule, BrowserXhr } from '@angular/http';

import { AppComponent } from './components/app/app.component';
import { AppErrorHandler } from './app.error-handler';
import { VehicleService } from './services/vehicle.service';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle';
import { PaginationComponent } from './components/shared/pagination.component';
import { PhotoService } from './services/photo.service';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { AuthService } from './services/auth.service';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { UnauthPage } from './components/errors/unauthorized/unauth-page.component';


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
        VehicleFormComponent,
        VehicleListComponent,
        ViewVehicleComponent,
        PaginationComponent,
        AdminComponent,
        UnauthPage
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles/new', component: VehicleFormComponent },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent },
            { path: 'vehicles/:id', component: ViewVehicleComponent },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard] },
            { path: 'home', component: HomeComponent },
            { path: 'errors/401', component: UnauthPage },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers:[
        { provide: ErrorHandler, useClass: AppErrorHandler },
        { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
        AuthService,
        AuthGuard,
        AdminAuthGuard,
        VehicleService,
        PhotoService,
        ProgressService,
    ]
})
export class AppModuleShared {
}
