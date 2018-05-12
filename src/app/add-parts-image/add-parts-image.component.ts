import { Component, OnInit } from '@angular/core';
import {SharedServiceService} from '../shared-service.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
@Component({
  selector: 'app-add-parts-image',
  templateUrl: './add-parts-image.component.html',
  styleUrls: ['./add-parts-image.component.css']
})
export class AddPartsImageComponent implements OnInit {

  pageName: String = "Add Vehicle Parts Image";

  vehicleData : any = {
    "Two Wheeler" : {
      "Vehicles" : ["Enfield", "Bajaj", "Hero", "Suzuki", "TVS", "Yamaha", "Honda", "Vespa", "Mahindra", "KTM", "Harely Davidson", "Ducati"]
    },
    "Three Wheeler" : {
      "Vehicles" : ["Bajaj", "TVS", "Mahindra", "Piaggio", "Arjun", "Vikram"]
    },
    "Four Wheerler" : {
       "Vehicles" : ["Suzuki", "Mahindra", "Hyundai", "Honda", "VW", "BMW", "MERCEDEZ", "FIAT", "TOYOTA", "TATA", "NISSAN", "DATSUN","RENAULT", "ISUZU", "MITSUBISHI", "VOLVO","FORD","CHEVEROLET"]
    }, 
    "Commercial Vehicle" : {
      "Vehicles" : ["Eicher", "Ashok Leyland", "TATA", "Mahindra", "AMW", "BHARAT BENZ", "Force"]
    }
  };

  constructor(private data: SharedServiceService, private afs: AngularFirestore) {
    this.data.changePageName(this.pageName);
   }

  ngOnInit() {
  }

}
