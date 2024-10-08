import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export default class RegisterComponent {
  name: string = '';
  lastName: string = '';
  email: string = '';
  rol: string = 'customer'; 
  password: string = '';
  password_confirmation: string = '';
  passwordMismatch: boolean = false;

  constructor(private authService: AuthService){}

  register(event: Event): void {
    event.preventDefault();
    if (this.password !== this.password_confirmation) {
      this.passwordMismatch = true; 
      return;
    } else {
      this.passwordMismatch = false; 
    }

    this.authService.register(this.name, this.lastName, this.email, this.password, this.password_confirmation, this.rol).subscribe({
      // next:()=>console.log("Se registro el usuario"),
      // error:(error) => console.log("Se produjo un erro: " + error)
    });
  }
}
