import { Component, OnInit, ViewChild } from '@angular/core';
import {SharedServiceService} from '../shared-service.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import {VehicleParts} from '../vehicleParts';
import {Vehicle} from '../vehicle';
import { MatTableDataSource, MatSort } from '@angular/material';
@Component({
  selector: 'app-add-parts',
  templateUrl: './add-parts.component.html',
  styleUrls: ['./add-parts.component.css']
})
export class AddPartsComponent implements OnInit {

  pageName: String = "Add Vehicle Parts";
  vehicleData : any;
  vehicleTypes : any;  
  vehicles : any;
  vehicleModels : any;
  vehicleListFromFirebase : any =[];

  @ViewChild(MatSort) sort: MatSort;
  dataSource= new MatTableDataSource();

  vehiclePartsDetails: Observable<VehicleParts[]>;
  vehicleModelDetails: Observable<Vehicle[]>;
  private itemPartsDoc: AngularFirestoreCollection<VehicleParts>;
  private itemModelDoc: AngularFirestoreCollection<Vehicle>;

  selectedVehicle : VehicleParts;

  displayedColumns = ['vehicleType', 'vehicleName', 'modelName', 'modelNumber', 'partName', 'oemNumber', 'manufacturerNumber'];

  constructor(private data: SharedServiceService, private afs: AngularFirestore) {
    this.data.changePageName(this.pageName);
    this.selectedVehicle = new VehicleParts();
    this.vehicleData = this.data.vehicleData;
    this.vehicleTypes = ["Two Wheeler", "Three Wheeler", "Four Wheeler", "Commercial vehicle"]
    this.itemPartsDoc = afs.collection('VehiclePartsDetails');
    this.itemModelDoc = afs.collection('VehicleModelDetails');
    this.vehiclePartsDetails = this.itemPartsDoc.valueChanges();
    this.vehicleModelDetails = this.itemModelDoc.valueChanges();
    
    this.vehicleModelDetails.subscribe((data) => {
      console.log(data);
      console.log(data[0]);
      this.vehicleListFromFirebase = data;
     
    });

    this.vehiclePartsDetails.subscribe((data) => {
      console.log(data);
      console.log(data[0]);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
   });
  }

   vechicleTypeChange() {
    console.log("vehicle type "+this.selectedVehicle.vehicleType);
    console.log(this.vehicleData[this.selectedVehicle.vehicleType].Vehicles);
    this.vehicles = this.vehicleData[this.selectedVehicle.vehicleType].Vehicles;
  }

  vechicleChange() {
    
    console.log(this.vehicleListFromFirebase);
    let vehicleArr : any =[];
      for(let vehicle of this.vehicleListFromFirebase) {
        console.log(vehicle);
        console.log(this.selectedVehicle.vehicleName);
        console.log(vehicle.vehicleName);

        console.log(vehicle.vehicleType);
        console.log(this.selectedVehicle.vehicleType);
        if(this.selectedVehicle.vehicleName === vehicle.vehicleName &&
          this.selectedVehicle.vehicleType === vehicle.vehicleType) {
            console.log("success");
            vehicleArr.push(vehicle);
          }        
      } 
      console.log(`vehicle Array : ${vehicleArr[0].vehicleName}`)    ;
    this.vehicleModels = vehicleArr;
    
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

   ngOnInit() {
    this.dataSource.sort = this.sort;
  }
  addModelParts() {
    console.log(this.selectedVehicle)
    this.itemPartsDoc.doc(this.selectedVehicle.vehicleType.toString()+
    "_"+this.selectedVehicle.vehicleName.toString()+
    "_"+this.selectedVehicle.modelName.toString()+
    "_"+this.selectedVehicle.modelNumber.toString()
  ).set(JSON.parse(JSON.stringify(this.selectedVehicle)));
  }

}
