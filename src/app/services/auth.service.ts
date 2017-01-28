import { Injectable } from '@angular/core';
import {tokenNotExpired } from 'angular2-jwt'
import {Router} from '@angular/router'
import Auth0Lock from "auth0-lock";


// declare var Auth0Lock : any

@Injectable()
export class AuthService {

	lock = new Auth0Lock('5g6B7beJ7gd9Ubj59WAL5hBqUqo09yTj', 'kmjayadeep.auth0.com', {});

	constructor(private router:Router) {
		this.lock.on("authenticated", (authResult) => {
			localStorage.setItem('id_token', authResult.idToken);

			this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
				if (error) {
					console.log(error);
				}

				localStorage.setItem('profile', JSON.stringify(profile));
			});

			this.lock.hide();

		});
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
