import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showNavbar = true

  constructor(
    private servicioAuth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token')
    this.servicioAuth.isAuthenticated.next(token !== null)

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd)
        if (event.url === '/auth/login' || event.url === '/auth/signin')
          this.showNavbar = false
        else
          this.showNavbar = true
    })
  }
}
