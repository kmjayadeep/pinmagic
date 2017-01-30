import { Injectable } from '@angular/core';
import { Http} from '@angular/http'

import { AuthHttp } from 'angular2-jwt';

import {Pin} from './pin'

import 'rxjs/add/operator/toPromise';


@Injectable()
export class PinService {

  constructor(private http:Http,public authHttp: AuthHttp) { }

  getAllPins(){
  	return this.http
	  	.get('/api/pins')
	  	.toPromise()
	  	.then(response=>response.json() as Pin[])
	  	.catch(this.handleError)
  }

  addPin(pin:any){
    return this.authHttp
      .post('/api/pin',pin)
      .toPromise()
      .then(response=>response.json())
      .catch(this.handleError)
  }

  private handleError(error:any){
  	console.log(error)
  	return Promise.reject(error)
  }

}
