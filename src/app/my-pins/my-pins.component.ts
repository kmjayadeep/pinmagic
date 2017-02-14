import { Component, OnInit } from '@angular/core';
import {PinService} from '../services/pin.service';

declare var Masonry;

@Component({
	selector: 'app-my-pins',
	templateUrl: './my-pins.component.html',
	styleUrls: ['./my-pins.component.css']
})
export class MyPinsComponent implements OnInit {


	pins:any = []
	userId = ''

	constructor(private pinService:PinService) {
		pinService.dataChange.subscribe(data=>{
			this.ngOnInit()
		})		
	}

	ngOnInit() {
		if(localStorage['profile']){
			this.userId = JSON.parse(localStorage['profile'])._id
		}
		this.pinService.getMyPins().then(pins=>{
			this.pins = pins
			console.log(pins)
			setTimeout(this.initMasonry,1000)
		})
	}

	initMasonry(){
		var elem = document.querySelector('.grid');
		// console.log(elem)
		var msnry = new Masonry( elem, {
		  // options
		  itemSelector: '.grid-item',
		  columnWidth: 200
		});
		// console.log(msnry)
	}

	toggleStar(pinId){
		this.pinService.star(pinId).then((p)=>{
			this.pins = this.pins.map(pin=>{
				if(pin._id==p._id)
					pin.stars = p.stars
				return pin
			})
			setTimeout(this.initMasonry,1000)
		})
	}

	removePin(pinId){
		console.log(pinId)
		this.pinService.remove(pinId).then(()=>{
			this.pins = this.pins.filter(pin=>pin._id!=pinId)
		})
	}

}
