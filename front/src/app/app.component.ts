import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private servicioAuth: AuthService
  ) {}

   ngOnInit() {
    const token = localStorage.getItem('token')
    this.servicioAuth.isAuthenticated.next(token !== null)
   }
}
