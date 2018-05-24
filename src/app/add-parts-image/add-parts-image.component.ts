import { Component, OnInit, ViewChild } from '@angular/core';
import {SharedServiceService} from '../shared-service.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import {VehicleParts} from '../vehicleParts';
import {Vehicle} from '../vehicle';

@Component({
  selector: 'app-add-parts-image',
  templateUrl: './add-parts-image.component.html',
  styleUrls: ['./add-parts-image.component.scss']
})
export class AddPartsImageComponent implements OnInit {

  pageName: String = "Add Vehicle Parts Image";

  vehicleData : any;
  vehicleTypes : any;  
  vehicles : any;
  vehicleModels : any;
  vehicleListFromFirebase : any =[];
  vehiclePartsListFromFirebase : any =[];

  private itemDoc: AngularFirestoreCollection<Vehicle>;


  vehiclePartsDetails: Observable<VehicleParts[]>;
  vehicleModelDetails: Observable<Vehicle[]>;
  private itemPartsDoc: AngularFirestoreCollection<VehicleParts>;
  private itemModelDoc: AngularFirestoreCollection<Vehicle>;

  selectedVehicle : VehicleParts;

  displayedColumns = ['vehicleType', 'vehicleName', 'modelName', 'modelNumber', 'partName', 'oemNumber', 'manufacturerNumber'];

  constructor(private data: SharedServiceService, private afs: AngularFirestore, private storage: AngularFireStorage) {
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
      this.vehiclePartsListFromFirebase = data;
   });
  }

   vechicleTypeChange() {
    console.log("vehicle type "+this.selectedVehicle.vehicleType);
    console.log(this.vehicleData[this.selectedVehicle.vehicleType].Vehicles);
    this.vehicles = this.vehicleData[this.selectedVehicle.vehicleType].Vehicles;
  }

  modelChange(){
    let vehicleArr : any =[];
    console.log("model change Mela");
      for(let vehicle of this.vehiclePartsListFromFirebase) {
        console.log(vehicle);
        
        if(this.selectedVehicle.vehicleName === vehicle.vehicleName &&
          this.selectedVehicle.vehicleType === vehicle.vehicleType &&
          this.selectedVehicle.modelName === vehicle.modelName &&
          this.selectedVehicle.modelNumber === vehicle.modelNumber) {
            console.log("model change");
            this.selectedVehicle.partName = vehicle.partName;
            this.selectedVehicle.oemNumber = vehicle.oemNumber;
            this.selectedVehicle.manufacturerNumber = vehicle.manufacturerNumber
          }        
      } 
    
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

  ngOnInit() {
  }

  
  // Main task 
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  

  
  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })
    let ref = this.storage.ref(path);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(snap => {
        console.log(snap)
        if (snap.bytesTransferred === snap.totalBytes) {
          
        }
      })
)

this.task.snapshotChanges().pipe(
  finalize(() => {
    this.downloadURL = ref.getDownloadURL();
    // Update firestore on completion
    this.itemPartsDoc.doc(this.selectedVehicle.vehicleType.toString()+
    "_"+this.selectedVehicle.vehicleName.toString()+
    "_"+this.selectedVehicle.modelName.toString()+
    "_"+this.selectedVehicle.modelNumber.toString()).update({"imgPath" : path});
    console.log(this.downloadURL);
     
  })
)
.subscribe()
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}
