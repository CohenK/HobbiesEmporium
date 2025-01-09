import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankyouModalComponent } from './thankyou-modal.component';

describe('ThankyouModalComponent', () => {
  let component: ThankyouModalComponent;
  let fixture: ComponentFixture<ThankyouModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThankyouModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThankyouModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
