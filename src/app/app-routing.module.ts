import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddModalComponent } from './add-modal/add-modal.component';
import { AddModalImageComponent } from './add-modal-image/add-modal-image.component';
import { AddPartsComponent } from './add-parts/add-parts.component';
import { AddPartsImageComponent } from './add-parts-image/add-parts-image.component';

const appRoutes: Routes = [
    { path: 'AddModal', component: AddModalComponent },
    { path: 'AddModalImage', component: AddModalImageComponent },
    { path: 'AddParts', component: AddPartsComponent },
    { path: 'AddPartsImage', component: AddPartsImageComponent },
    { path: '',   redirectTo: '/AddModal', pathMatch: 'full' }
  ];

@NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
        {
          enableTracing: false, // <-- debugging purposes only 
        }
      )
    ],
    exports: [
      RouterModule
    ],
    providers: [      
    ]
  })
  export class AppRoutingModule { }