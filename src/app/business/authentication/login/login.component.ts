import { Component } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { SwitchService } from '../../../functions/switch/switch.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {

  email: string = '';
  password: string = '';
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router, private switchService: SwitchService, private route: ActivatedRoute) { }
  showModal: boolean = false;
  messageModal: string = "";

  ngOnInit() {
    this.switchService.$modal.subscribe((valor) => { this.showModal = valor })
    this.switchService.$modalSuccess.subscribe((message: string) => {
      this.openModal(message); 
    });
  }

  openModal(message:string): void {
    this.showModal = true;
    this.messageModal = message;
    // console.log("Abriendo el modal con mensaje:", message); 
    
  }

  closeModal(): void {
    this.showModal = false;
  }

  deleteAccount(): void {
    this.closeModal();
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (error) => {
        this.openModal("error");
      }
    })
  }



}
