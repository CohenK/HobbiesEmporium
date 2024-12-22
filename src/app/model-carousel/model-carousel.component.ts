import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'model-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './model-carousel.component.html',
  styleUrl: './model-carousel.component.css'
})
export class ModelCarouselComponent {
  @Input() modelImgs: string[] = [];

  ngAfterViewInit(): void {
    const carouselElement = document.querySelector('#itemModelCarousel');

    if (carouselElement) {
      const carousel = new bootstrap.Carousel(carouselElement);
    }
   
    const carouselPrevNextButtons = document.querySelectorAll('.carousel-control-prev, .carousel-control-next');
    carouselPrevNextButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
      });
    });
  }
}
