import { Component } from '@angular/core';
import { UserService } from '../../../functions/user/user.service';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  user: any ;

  constructor(private userService: UserService, private activetedRoute: ActivatedRoute, private router: Router){}


  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.activetedRoute.params.subscribe(
      e=>{
        let id = e['id'];
        if(id){
          this.userService.getUser(id).subscribe(
            user => this.user = user
          );
        }
      }
    );
  }
  
  updateUser(event: Event): void {
    event.preventDefault();
    this.userService.updateUser(this.user).subscribe(
      e => {this.router.navigate(['/user'])}
    )
  }
}
