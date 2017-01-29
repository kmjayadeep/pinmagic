import { Injectable } from '@angular/core';
import {tokenNotExpired } from 'angular2-jwt'
import {Router} from '@angular/router'
import Auth0Lock from "auth0-lock";
import { Http} from '@angular/http'
import 'rxjs/add/operator/toPromise';

// declare var Auth0Lock : any

@Injectable()
export class AuthService {

	lock = new Auth0Lock('5g6B7beJ7gd9Ubj59WAL5hBqUqo09yTj', 'kmjayadeep.auth0.com', {});

	constructor(private router:Router,private http:Http) {
		this.lock.on("authenticated", (authResult) => {
			localStorage.setItem('id_token', authResult.idToken);

			this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
				if (error) {
					console.log(error);
				}

				// localStorage.setItem('profile', JSON.stringify(profile));
				this.http
				  	.post('/api/signup',profile)
				  	.toPromise()
				  	.then(response=>response.json())
				  	.catch(this.handleError)
				  	.then(profile=>{
						localStorage.setItem('profile', JSON.stringify(profile));
						console.log(profile)
				  	})
			});

			this.lock.hide();

		});
	}

	private handleError(error:any){
		console.log(error)
	}


	public login(){
		this.lock.show()
	}

	public isAuthenticated(){
		return tokenNotExpired()
	}

	public logout(){
		localStorage.removeItem('profile');
		localStorage.removeItem('id_token');
		this.router.navigateByUrl('/');
	}

}
