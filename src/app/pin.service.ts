import { Injectable } from '@angular/core';
import { Http} from '@angular/http'
import 'rxjs/add/operator/map';


@Injectable()
export class PinService {

  constructor(private http:Http) { }

  getAllPins(){
  	return this.http.get('/api/posts')
  	.map(res=>res.json())
  }

}
