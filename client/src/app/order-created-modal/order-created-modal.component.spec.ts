import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCreatedModalComponent } from './order-created-modal.component';

describe('OrderCreatedModalComponent', () => {
  let component: OrderCreatedModalComponent;
  let fixture: ComponentFixture<OrderCreatedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCreatedModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCreatedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
