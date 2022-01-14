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
    const es_comprador = JSON.parse(localStorage.getItem('es_comprador') || 'false')
    this.servicioAuth.isAuthenticated.next(token !== null)
   }
}
