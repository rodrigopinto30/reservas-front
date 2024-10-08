import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user: any;
  private tokenKey = "userData";

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getUserData();
    // console.log(this.user)
  }

}
