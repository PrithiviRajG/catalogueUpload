import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatButtonModule, MatCheckboxModule,
  MatOptionModule, MatSelectModule, MatInputModule,
  MatMenuModule, MatIconModule, MatToolbarModule, MatCardModule, MatExpansionModule, MatListModule, MatTableModule,
  MatNativeDateModule, MatDatepickerModule, MatSortModule 
} from '@angular/material';

import { Router } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule }        from './app-routing.module';
import { AddModalComponent } from './add-modal/add-modal.component';
import { AddModalImageComponent } from './add-modal-image/add-modal-image.component';
import { AddPartsComponent } from './add-parts/add-parts.component';
import { AddPartsImageComponent } from './add-parts-image/add-parts-image.component';
import {SharedServiceService} from './shared-service.service';
import { MapToIterable } from './map-to-iterable.pipe';
import { DropZoneDirective } from './drop-zone.directive';
import { FileSizePipe } from './file-size.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddModalComponent,
    AddModalImageComponent,
    AddPartsComponent,
    AddPartsImageComponent,
    MapToIterable,
    DropZoneDirective,
    FileSizePipe
  ],
  imports: [
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule, MatCheckboxModule, MatOptionModule,
    MatSelectModule, MatInputModule, BrowserAnimationsModule,
    MatMenuModule, MatIconModule, MatToolbarModule, MatCardModule, MatExpansionModule, MatListModule, MatTableModule,
    MatNativeDateModule, MatDatepickerModule , BrowserModule, MatSortModule
  ],
  providers: [SharedServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
