import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import  {SpaceListComponent}  from './space-list/space-list.component';
import { SpaceDetailComponent } from './space-detail/space-detail.component';

const routes: Routes = [
    { path: '', component: SpaceListComponent },
    { path: ':id', component: SpaceDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class SpaceRoutingModule {}
