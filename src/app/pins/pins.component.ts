import { Component, OnInit,AfterViewInit } from '@angular/core';
import {PinService} from '../services/pin.service';

declare var Masonry

@Component({
	selector: 'app-pins',
	templateUrl: './pins.component.html',
	styleUrls: ['./pins.component.css']
})
export class PinsComponent implements OnInit{

	pins:any = []

	constructor(private pinService:PinService) { }

	ngOnInit() {
		this.pinService.getAllPins().then(pins=>{
			this.pins = pins
			console.log(pins)
			setTimeout(this.initMasonry,1000)
		})
	}

	initMasonry(){
		var elem = document.querySelector('.grid');
		console.log(elem)
		var msnry = new Masonry( elem, {
		  // options
		  itemSelector: '.grid-item',
		  columnWidth: 200
		});
		console.log(msnry)
	}

}
