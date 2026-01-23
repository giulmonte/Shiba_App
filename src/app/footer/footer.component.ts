import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="site-footer">
      <div class="footer-content">
        <p>&copy; 2025 {{ appName }}. Realizzato in Angular.</p>
        <p>Progetto Demo per Stage | Versione 1.0</p>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background-color: #727272ff;
      color: #fff;
      padding: 1rem 0;
      text-align: center;
      margin-top: auto;
      width: 100%;
    }
    .footer-content p {
      margin: 5px 0;
      font-size: 0.9rem;
    }
  `]
})
export class FooterComponent {
  appName = 'Shiba-App';
}