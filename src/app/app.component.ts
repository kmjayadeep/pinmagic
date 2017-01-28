import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	providers:[AuthService],
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(private auth:AuthService){

	}

}
