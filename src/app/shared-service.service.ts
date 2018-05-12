import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class SharedServiceService {

  constructor() { }

  private pageName = new BehaviorSubject<String>("default message");
  currentpageName = this.pageName.asObservable();

  vehicleData : any = {
    "Two Wheeler" : {
      "Vehicles" : ["Enfield", "Bajaj", "Hero", "Suzuki", "TVS", "Yamaha", "Honda", "Vespa", "Mahindra", "KTM", "Harely Davidson", "Ducati"]
    },
    "Three Wheeler" : {
      "Vehicles" : ["Bajaj", "TVS", "Mahindra", "Piaggio", "Arjun", "Vikram"]
    },
    "Four Wheeler" : {
       "Vehicles" : ["Suzuki", "Mahindra", "Hyundai", "Honda", "VW", "BMW", "MERCEDEZ", "FIAT", "TOYOTA", "TATA", "NISSAN", "DATSUN","RENAULT", "ISUZU", "MITSUBISHI", "VOLVO","FORD","CHEVEROLET"]
    }, 
    "Commercial vehicle" : {
      "Vehicles" : ["Eicher", "Ashok Leyland", "TATA", "Mahindra", "AMW", "BHARAT BENZ", "Force"]
    }
  };
  
  changePageName(message: String) {
    this.pageName.next(message)
  }
}
