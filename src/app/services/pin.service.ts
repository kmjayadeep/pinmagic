import { Injectable } from '@angular/core';
import { Http} from '@angular/http'
import {Pin} from './pin'

import 'rxjs/add/operator/toPromise';


@Injectable()
export class PinService {

  constructor(private http:Http) { }

  getAllPins(){
  	return this.http
	  	.get('/api/pins')
	  	.toPromise()
	  	.then(response=>response.json() as Pin[])
	  	.catch(this.handleError)
  }

  private handleError(error:any){
  	console.log(error)
  	return Promise.reject(error)
  }

}
