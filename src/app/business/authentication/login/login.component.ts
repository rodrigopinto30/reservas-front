import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {

  email: string = '';
  password: string = '';

  constructor (private authService: AuthService, private router: Router) {}
  showModal: boolean = false;

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  deleteAccount(): void {
    console.log('Cuenta eliminada');
    this.closeModal();
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: ()=> this.router.navigate(['/dashboard']),
      error: (error) => {
        console.log("Fallo el inicio de sesion");
        this.openModal();
      }
    })
  }

}
