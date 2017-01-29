import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	providers:[AuthService],
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	private dropdownOpen:boolean = false
	private pin:any = {
		url:'',
		description:''
	}

	constructor(private auth:AuthService){}

	public send(){
		this.dropdownOpen = false
		console.log(this.pin)
	}

}
