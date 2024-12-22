import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelCarouselComponent } from './model-carousel.component';

describe('ModelCarouselComponent', () => {
  let component: ModelCarouselComponent;
  let fixture: ComponentFixture<ModelCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
