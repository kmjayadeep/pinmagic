import { Component, OnInit } from '@angular/core';
import {PinService} from '../pin.service'

@Component({
	selector: 'app-pins',
	templateUrl: './pins.component.html',
	styleUrls: ['./pins.component.css']
})
export class PinsComponent implements OnInit {

	pins:any = []

	constructor(private pinService:PinService) { }

	ngOnInit() {
		this.pinService.getAllPins().subscribe(pins=>{
			this.pins = pins
			console.log(pins)
		})
	}

}
