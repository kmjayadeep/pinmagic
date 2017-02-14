import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'
import { PinService } from './services/pin.service'

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

	constructor(private auth:AuthService,private pinService:PinService){}

	public send(){
		this.dropdownOpen = false
		this.pinService.addPin(this.pin)
		.then(pin=>{
			console.log(pin)
			this.pin = {url:'',description:''}
			this.pinService.observer.next(pin)
		}).catch(err=>{})
	}

}
