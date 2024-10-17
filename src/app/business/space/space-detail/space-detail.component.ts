import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpaceService } from '../../../functions/space/space.service';

@Component({
  selector: 'app-space-detail',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './space-detail.component.html',
  styleUrl: './space-detail.component.scss'
})
export class SpaceDetailComponent {

  space : any;

  constructor(private spaceService: SpaceService, private activetedRoute: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    this.loadSpace();
  }

  loadSpace(): void {
    this.activetedRoute.params.subscribe(
      e=>{
        let id = e['id'];
        if(id){
          this.spaceService.getSpace(id).subscribe(
            space => this.space = space
          );
        }
      }
    );
  }

  updateSpace(event: Event):void {
    event.preventDefault();
    this.spaceService.updateSpace(this.space).subscribe(
      e=>{this.router.navigate(['/space'])}
    )
  }
}
 