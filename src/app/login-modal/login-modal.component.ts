import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { invalidPassword } from '../validators';
import { AuthService } from '../../shared/services/AuthService';


@Component({
  selector: 'login-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  @Output() userID = new EventEmitter<any>();
  loginEmail: string = "";
  loginPassword: string = "";
  newEmail: string = "";
  newPassword: string = "";

  constructor(private auth: AuthService){}

  loginForm = new FormGroup({
    loginEmail: new FormControl('', [Validators.required, Validators.email]),
    loginPassword: new FormControl('', [Validators.required])
  });

  registerForm = new FormGroup({
    newEmail: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required, invalidPassword])
  });

  login(){
    this.auth.login(this.loginEmail,this.loginPassword).then((id:string)=>{
      this.userID.emit(id);
    })
    
  }

  register(){
    this.auth.register(this.newEmail,this.newPassword);
  }
}
