import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { invalidPassword } from '../validators';
import { AuthService } from '../../shared/services/AuthService';
import { EventService } from '../../shared/services/EventService';


@Component({
  selector: 'login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginEmail: string = "";
  loginPassword: string = "";
  newEmail: string = "";
  newPassword: string = "";

  constructor(private auth: AuthService, private eventService: EventService){}

  loginForm = new FormGroup({
    loginEmail: new FormControl('', [Validators.required, Validators.email]),
    loginPassword: new FormControl('', [Validators.required])
  });

  registerForm = new FormGroup({
    newEmail: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required, invalidPassword])
  });

  login(){
    console.log('logging in')
    this.auth.login(this.loginEmail,this.loginPassword).then((id:string)=>{
      this.eventService.emit('userLogin',id);
    });
  }

  register(){
    this.auth.register(this.newEmail,this.newPassword);
  }
}
