import { Component } from '@angular/core';
import { UserService } from '../../../functions/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export default class UserListComponent {

  allUser: any[] = [];

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.loadAllUser();
  }

  loadAllUser(): void {
    this.userService.allUser().subscribe({
      next: (allUser) => {this.allUser = allUser},
      error: (error) => {}
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      res=>this.userService.allUser().subscribe(
        response=>this.allUser = response
      )
    );
  }
}
