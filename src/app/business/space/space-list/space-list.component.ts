import { Component } from '@angular/core';
import { SpaceService } from '../../../functions/space/space.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-space-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './space-list.component.html',
  styleUrl: './space-list.component.scss'
})
export class SpaceListComponent {

  allSpace: any[] = [];

  constructor(private spaceService: SpaceService){}

  ngOnInit(): void {
    this.loadAllSpace();
  }

  loadAllSpace(): void {
    this.spaceService.getAllSpace().subscribe(
      res => this.allSpace = res
    );
  }

  deleteSpace(id: number): void {
    this.spaceService.deleteSpace(id).subscribe(
      res => this.spaceService.getAllSpace().subscribe(
        response => this.allSpace = response
      )
    )
  }
}
