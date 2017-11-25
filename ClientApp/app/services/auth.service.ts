import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'hc0x8mrPDx2fYKZIvKsua1KMbqrynKKj',
    domain: 'vegaprojectasp.auth0.com',
    responseType: 'token',
    audience: 'https://api.vega.com',
    redirectUri: 'http://localhost:5000/',      
    scope: 'openid email profile'
  });

  userProfile: any;

  constructor(public router: Router) {
    var prof = localStorage.getItem('profile');
    if (prof){
      this.userProfile = JSON.parse(prof);
    }
  }


  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      console.log("authResult", authResult);
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
        
        this.getProfile();

      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult: any): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove token, expiry time and profile from localStorage
    // localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    this.userProfile = null;
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time    
    var ExpDate = localStorage.getItem('expires_at');
    if(ExpDate){
      const expiresAt = JSON.parse(ExpDate);
      return new Date().getTime() < expiresAt;
    }
    return false;
  }

  public getProfile(): void {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }
  
    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
        localStorage.setItem('profile', JSON.stringify(profile));
        console.log(this.userProfile);
      }
      else{
        throw err;
      }
    });
  }
}