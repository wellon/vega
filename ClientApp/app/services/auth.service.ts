import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { JwtHelper } from 'angular2-jwt';

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
  private roles: string[] = [];

  constructor(public router: Router) {
    var prof = localStorage.getItem('profile');
    if (prof){
      this.userProfile = JSON.parse(prof);
    }

    var token = localStorage.getItem('token');
    if (token) {
      var jwtHelper = new JwtHelper();
      var decodedToken = jwtHelper.decodeToken(token);
      this.roles = decodedToken['https://vega.com/roles'];
    }
  }


  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
        
        var jwtHelper = new JwtHelper();
        var decodedToken = jwtHelper.decodeToken(authResult.accessToken);
        this.roles = decodedToken['https://vega.com/roles'];

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

  public logout(): void {
    // Remove token, expiry time and profile from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    this.userProfile = null;
    this.roles = [];
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isInRole(roleName: any) {
    // console.log("isInRole: ", roleName);
    return this.roles.indexOf(roleName) > -1;
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
      }
      else{
        throw err;
      }
    });
  }
}