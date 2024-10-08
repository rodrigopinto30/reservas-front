import { Component } from '@angular/core';
import { UserService } from '../../functions/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpaceService } from '../../functions/space/space.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export default class DashboardComponent {
  users: any[] = [];
  spaces: any[] =[];

  constructor(private userService: UserService, private spaceService: SpaceService){}

  ngOnInit(): void {
    this.loadUsers();
    this.loadSpaces();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) =>{this.users = users; },
      error: (error) => {
        // console.log("Error al obtener los datos", error);
      }
    })
  }

  loadSpaces(): void {
    this.spaceService.getSpaces().subscribe({
      next:(spaces) => {this.spaces = spaces; console.log(spaces)},
      error: (error) => {

      }
    });
  }
}
