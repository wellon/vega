import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router/src/interfaces';
import { AuthGuard } from './auth-guard.service';
import { Router } from '@angular/router';

@Injectable()
export class AdminAuthGuard extends AuthGuard{

    constructor(auth: AuthService,
                public router: Router) { 
        super(auth);
    }

    canActivate(){
        var isAuthenticated = super.canActivate();

        if(isAuthenticated) {
            if(!this.auth.isInRole('Admin'))
                this.router.navigate(['/']);
            return true;
        }
        else{
            return false;
        }
    }
}