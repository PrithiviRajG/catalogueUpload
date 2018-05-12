import { Component } from '@angular/core';
import {SharedServiceService} from './shared-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  pageName : any;

  constructor(private data: SharedServiceService, private router : Router){
    this.data.currentpageName.subscribe(message => this.pageName = message)
  }

  addVehicleModal(){
    this.router.navigate(['/AddModal']);
  }

  addVehicleModalImage(){
    this.router.navigate(['/AddModalImage']);
  }

  addVehicleParts(){
    this.router.navigate(['/AddParts']);
  }

  addVehiclePartsImage(){
    this.router.navigate(['/AddPartsImage']);

  }

}
