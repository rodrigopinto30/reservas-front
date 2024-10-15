import { Component } from '@angular/core';
import { UserService } from '../../functions/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpaceService } from '../../functions/space/space.service';
import { ReservationService } from '../../functions/reservation/reservation.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export default class DashboardComponent {
  users: any[] = [];
  spaces: any[] = [];
  reservations: any[] = [];
  activeReservations: any[] = [];
  finishedReservations: any[] = [];

  constructor(private userService: UserService, private spaceService: SpaceService, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadSpaces();
    this.loadReservation();
    this.loadActiveReservation();
    this.loadFinishedReservation();
  }

  loadUsers(): void {
    this.userService.lastUser().subscribe({
      next: (users) => { this.users = users},
      error: (error) => {
      }
    })
  }

  loadSpaces(): void {
    this.spaceService.getSpaces().subscribe({
      next: (spaces) => { this.spaces = spaces },
      error: (error) => {
      }
    });
  }

  loadReservation(): void {
    this.reservationService.getReservations().subscribe({
      next: (reservations) => { this.reservations = reservations },
      error: (error) => { }
    });
  }

  loadActiveReservation(): void {
    this.reservationService.getActiveReservations().subscribe({
      next: (activeReservations) => { 
        this.activeReservations = activeReservations;
      },
      error: (error) => { }
    });
  }

  loadFinishedReservation(): void {
    this.reservationService.getFinishedReservations().subscribe({
      next:(finishedReservations) => {this.finishedReservations = finishedReservations},
      error: (error) => {console.log(error)}
    })
  }
}
