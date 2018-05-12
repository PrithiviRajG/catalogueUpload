import { Component, OnInit } from '@angular/core';
import {SharedServiceService} from '../shared-service.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
@Component({
  selector: 'app-add-parts',
  templateUrl: './add-parts.component.html',
  styleUrls: ['./add-parts.component.css']
})
export class AddPartsComponent implements OnInit {

  pageName: String = "Add Vehicle Parts";

  constructor(private data: SharedServiceService, private afs: AngularFirestore) {
    this.data.changePageName(this.pageName);
   }


  ngOnInit() {
  }

}
