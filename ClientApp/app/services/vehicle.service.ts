import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SaveVehicle } from '../models/vehicle';

@Injectable()
export class VehicleService {

  private readonly vehiclesEndpoint = '/api/vehicles';
  
  constructor(private http: Http) { }

  getMakes() {
    return this.http.get('/api/makes')
      .map(res => res.json());
  }

  getFeatures() {
    return this.http.get('/api/features')
      .map(res => res.json());
  }

  create(vehicle: any){
    return this.http.post(this.vehiclesEndpoint, vehicle)
      .map(res => res.json());
  }

  getVehicle(id: any) {
    return this.http.get(this.vehiclesEndpoint + '/' + id)
      .map(res => res.json());
  }

  getVehicles() {
    return this.http.get(this.vehiclesEndpoint)
      .map(res => res.json());
  }

  update(vehicle: SaveVehicle){
    return this.http.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle)
      .map(res => res.json());
  }

  delete(id: any){
    return this.http.delete(this.vehiclesEndpoint + '/' + id)
      .map(res => res.json());
  }
}
