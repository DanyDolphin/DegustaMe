import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SkeletonComponent } from './skeleton/skeleton.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SkeletonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SkeletonComponent
  ]
})
export class SharedModule { }
