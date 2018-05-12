import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModalImageComponent } from './add-modal-image.component';

describe('AddModalImageComponent', () => {
  let component: AddModalImageComponent;
  let fixture: ComponentFixture<AddModalImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddModalImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModalImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
