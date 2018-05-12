import { Component, OnInit } from '@angular/core';
import {SharedServiceService} from '../shared-service.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
@Component({
  selector: 'app-add-modal-image',
  templateUrl: './add-modal-image.component.html',
  styleUrls: ['./add-modal-image.component.css']
})
export class AddModalImageComponent implements OnInit {

  pageName: String = "Add Vehicle Modal Image";

  constructor(private data: SharedServiceService, private afs: AngularFirestore) {
    this.data.changePageName(this.pageName);
   }

  ngOnInit() {
  }

}
