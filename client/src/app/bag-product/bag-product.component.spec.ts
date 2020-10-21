import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagProductComponent } from './bag-product.component';

describe('BagProductComponent', () => {
  let component: BagProductComponent;
  let fixture: ComponentFixture<BagProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BagProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
