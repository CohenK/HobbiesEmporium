import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() items: number = 0;

  constructor(private router: Router){}
  toHomepage(){
    this.router.navigate([''])
  }
}
