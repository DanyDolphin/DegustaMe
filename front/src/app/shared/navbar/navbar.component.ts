import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isLoggedIn = false
  busqueda = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe(v => this.isLoggedIn = v)
  }

  onSearchSubmit(event: Event) {
    event.preventDefault()
    this.router.navigate([`/busqueda/${encodeURIComponent(this.busqueda)}`])
  }

}
