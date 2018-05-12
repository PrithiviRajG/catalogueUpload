import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartsImageComponent } from './add-parts-image.component';

describe('AddPartsImageComponent', () => {
  let component: AddPartsImageComponent;
  let fixture: ComponentFixture<AddPartsImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartsImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartsImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
