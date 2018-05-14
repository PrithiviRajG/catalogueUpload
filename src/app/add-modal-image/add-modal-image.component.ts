import { Component, OnInit } from '@angular/core';
import {SharedServiceService} from '../shared-service.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import {Vehicle} from '../vehicle';

@Component({
  selector: 'app-add-modal-image',
  templateUrl: './add-modal-image.component.html',
  styleUrls: ['./add-modal-image.component.scss']
})
export class AddModalImageComponent implements OnInit {

  pageName: String = "Add Vehicle Modal Image";
  vehicleData : any;
  vehicleTypes : any;  
  vehicles : any;
  vehicleModels : any;
  vehicleListFromFirebase : any =[];

  vehicleDetails: Observable<Vehicle[]>;
  private itemDoc: AngularFirestoreCollection<Vehicle>;

  selectedVehicle : Vehicle;

  displayedColumns = ['vehicleType', 'vehicleName', 'modelName', 'modelNumber'];


  constructor(private data: SharedServiceService, private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.data.changePageName(this.pageName);
    //this.vehicleModels = Array<any>();
    this.selectedVehicle = new Vehicle();
    this.vehicleData = this.data.vehicleData;
    this.vehicleTypes = ["Two Wheeler", "Three Wheeler", "Four Wheeler", "Commercial vehicle"]
    this.itemDoc = afs.collection('VehicleModelDetails');
    this.vehicleDetails = this.itemDoc.valueChanges();
    this.vehicleDetails.subscribe((data) => {
      console.log(data);
      console.log(data[0]);
      this.vehicleListFromFirebase = data;
     
    })
   }

   vechicleTypeChange() {
    console.log("vehicle type "+this.selectedVehicle.vehicleType);
    console.log(this.vehicleData[this.selectedVehicle.vehicleType].Vehicles);
    this.vehicles = this.vehicleData[this.selectedVehicle.vehicleType].Vehicles;
  }

  vechicleChange() {
    console.log("ulla varuthu");
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

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(snap => {
        console.log(snap)
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.itemDoc.doc(this.selectedVehicle.vehicleType.toString()+"_"+this.selectedVehicle.vehicleName.toString()).update({"imgPath" : path});
          console.log("sfsd "+this.task.downloadURL());
        }
      })
)

    // The file's download URL
    this.downloadURL = this.task.downloadURL(); 
    this.downloadURL.subscribe((url)=>{
      console.log(`URL ${url}`)
    });
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}
