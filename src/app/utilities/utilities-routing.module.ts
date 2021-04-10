import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilitiesComponent } from './utilities.component';
import { ColorsComponent } from './colors/colors.component';

const routes: Routes = [
  { path: '', component: UtilitiesComponent },
  { path: 'color', component: ColorsComponent },
  { path: 'color/:type', component: ColorsComponent },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilitiesRoutingModule { }
