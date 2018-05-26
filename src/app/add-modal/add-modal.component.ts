import { Component, OnInit, ViewChild } from '@angular/core';
import {SharedServiceService} from '../shared-service.service';
import {Vehicle} from '../vehicle';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, MatSort } from '@angular/material';
@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent {

  pageName: String = "Add Vehicle Modal";
  vehicleData : any;
  vehicleTypes : any;  
  vehicles : any;

  private itemDoc: AngularFirestoreCollection<Vehicle>;
  @ViewChild(MatSort) sort: MatSort;
  dataSource= new MatTableDataSource();

  vehicleDetails: Observable<Vehicle[]>;
  currectVechicles : Vehicle[];
  

  selectedVehicle : Vehicle;

  displayedColumns = ['vehicleType', 'vehicleName', 'modelName', 'modelNumber'];

  constructor(private data: SharedServiceService, private afs: AngularFirestore) {
    this.currectVechicles = new Array<Vehicle>();
    this.data.changePageName(this.pageName);
    this.selectedVehicle = new Vehicle();
    this.vehicleData = this.data.vehicleData;
    this.vehicleTypes = ["Two Wheeler", "Three Wheeler", "Four Wheeler", "Commercial vehicle"]
    this.itemDoc = afs.collection('VehicleModelDetails');
    this.vehicleDetails = this.itemDoc.valueChanges();
    this.vehicleDetails.subscribe((data) => {
      for(let vechicle of data){
        this.currectVechicles.push(vechicle);
      }
      console.log(data);
      console.log(data[0])
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
   }

   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

   ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  addModel() {
    console.log(this.selectedVehicle)
    this.currectVechicles.push(this.selectedVehicle);
    console.log("adding Entry")
    //this.itemDoc.doc(this.selectedVehicle.vehicleType.toString()+"_"+this.selectedVehicle.vehicleName.toString()).collection(`${this.selectedVehicle.modelName}`).add(JSON.parse(JSON.stringify(this.selectedVehicle)));       
    this.itemDoc.doc(this.selectedVehicle.vehicleType.toString()+"_"+this.selectedVehicle.vehicleName.toString()).set(JSON.parse(JSON.stringify(this.selectedVehicle)));       
  }

  vechicleTypeChange() {
    console.log("vehicle type "+this.selectedVehicle.vehicleType);
    console.log(this.vehicleData[this.selectedVehicle.vehicleType].Vehicles);
    this.vehicles = this.vehicleData[this.selectedVehicle.vehicleType].Vehicles;
  }

}
