import { Injectable } from '@angular/core';
import { Http} from '@angular/http'

import { AuthHttp } from 'angular2-jwt';

import {Pin} from './pin'

import 'rxjs/add/operator/toPromise';
import {Observable,Observer} from 'rxjs'


@Injectable()
export class PinService {

  data:any
  dataChange:Observable<any>
  observer:Observer<any>;

  constructor(private http:Http,public authHttp: AuthHttp) {
    this.dataChange = new Observable(ob=>{
      this.observer = ob;
    })
  }

  getAllPins(){
    return this.http
      .get('/api/pins')
      .toPromise()
      .then(response=>response.json() as Pin[])
      .catch(this.handleError)
  }

  getMyPins(){
  	return this.authHttp
	  	.get('/api/mypins')
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

  star(pinId){
    return this.authHttp
      .get('/api/pin/star/'+pinId)
      .toPromise()
      .then(response=>response.json())
      .catch(this.handleError)
  }

  remove(pinId){
    return this.authHttp
      .delete('/api/pin/'+pinId)
      .toPromise()
      .then(response=>response.json())
      .catch(this.handleError)
  }

  private handleError(error:any){
  	console.log(error)
  	return Promise.reject(error)
  }

}
