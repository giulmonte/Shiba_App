import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="navbar">
      <div class="logo">
        <a [routerLink]="['/']">Shiba-App</a>
      </div>
      <nav>
        <ul>
          <li><a [routerLink]="['/']" [routerLinkActive]="'active-link'">Home</a></li>
          <li><a [routerLink]="['/prova']" [routerLinkActive]="'active-link'">Razze</a></li>
          <li><a [routerLink]="['/adozione']" [routerLinkActive]="'active-link'">Adotta</a></li> 
          <li><a [routerLink]="['/dashboard']" [routerLinkActive]="'active-link'">Le Nostre Adozioni</a></li> 
        </ul>
      </nav>
    </header>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 3rem;
      background-color: #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .logo a {
      font-size: 1.5rem;
      font-weight: 700;
      color: #ff0000ff;
      text-decoration: none;
    }
    nav ul {
      list-style: none;
      display: flex;
      gap: 2rem;
      margin: 0;
      padding: 0;
    }
    nav li a {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s;
    }
    nav li a:hover {
      color: #ff0000ff;
    }
    .active-link {
      color: #ff0000ff !important;
      font-weight: 700;
    }
    .cta-button {
      padding: 0.5rem 1.5rem;
      background-color: #ff0000ff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.3s;
    }
    .cta-button:hover {
      background-color: #b30000ff;
    }
  `]
})
export class NavbarComponent {}
