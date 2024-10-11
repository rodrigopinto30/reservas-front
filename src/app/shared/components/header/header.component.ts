import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarService } from '../../../functions/sidebar/sidebar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: any;
  private tokenKey = "userData";
  isOpen = false;
  openOptionProfile = false;
  openCalendar = false;

  @ViewChild('profileOptions', { static: false }) profileOptions!: ElementRef;
  @ViewChild('profileButton', { static: false }) profileButton!: ElementRef;

  @ViewChild('calendarOptions', { static: false }) calendarOptions!: ElementRef;
  @ViewChild('calendarButton', { static: false }) calendarButton!: ElementRef;

  constructor(private authService: AuthService, private sidebarService: SidebarService) { }

  ngOnInit() {
    this.user = this.authService.getUserData();
    this.sidebarService.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  toggleOptionProfile(): void {
    this.openOptionProfile = !this.openOptionProfile;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const clickedInsideProfile = this.profileOptions?.nativeElement.contains(event.target);
    const clickedOnButton = this.profileButton?.nativeElement.contains(event.target);

    const clickedInsideCalendar = this.calendarOptions?.nativeElement.contains(event.target);
    const clickedOnCalendarButton = this.calendarButton?.nativeElement.contains(event.target);

    if (!clickedInsideProfile && !clickedOnButton && this.openOptionProfile) {
      this.openOptionProfile = false;
    }

    if (!clickedInsideCalendar && !clickedOnCalendarButton && this.openCalendar) {
      this.openCalendar = false;
    }
  }

  logout(): void {
    this.authService.logout();
  }

  toggleCalendar(): void {
    this.openCalendar = !this.openCalendar;
  }
}
