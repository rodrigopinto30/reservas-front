import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarService } from '../../../functions/sidebar/sidebar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user: any;
  private tokenKey = "userData";
  isOpen = false;

  constructor(private authService: AuthService, private sidebarService: SidebarService) {}

  ngOnInit() {
    this.user = this.authService.getUserData();
    this.sidebarService.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

}
