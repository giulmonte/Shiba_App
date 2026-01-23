import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content" [@fadeInUp]>
        <span class="badge">PROGETTO STAGE 2026</span>
        <h1>Benvenuto nel Mondo degli <span class="text-gradient">Shiba-Inu</span></h1>
        <p>Esplora, aggiungi e adotta la razza più iconica del Giappone.</p>
        <div class="button-group">
          <a class="btn-modern btn-red" [routerLink]="['/prova']">🚀 Aggiungi Shiba</a>
          <a class="btn-modern btn-white" [routerLink]="['/adozione']">🐾 Adotta Ora</a>
        </div>
      </div>
    </section>

    <section class="shiba-description-section">
      <div class="shiba-description-container" [@fadeInUp]>
        <div class="accent-line"></div>
        <h2 class="section-title">Quel che c'è da sapere..</h2>
        <div class="story-body">
          <p>
        Il cane <strong>Shiba Inu 🐕</strong> è una razza giapponese dalle origini antichissime; sapevi che, ancora oggi, è una tra le più popolari in Giappone?
        Questi cani di taglia media in origine venivano allevati per cacciare selvaggina piccola come conigli e uccelli, ma ora sono tenuti principalmente come animali da compagnia.
          </p>
          <p>
        Ciò nonostante, ci sono molte cose che non si conoscono di questa affascinante razza canina. Per esempio, lo sapevi che <em>Shiba Inu</em> si traduce in “piccolo cane”?
        Diventato famoso per il film “Hachiko”, si tratta di una delle sei razze native giapponesi riconosciute dalla Federazione Cinologica Internazionale… e le curiosità non finiscono qui.
      </p>
        </div>
      </div>
    </section>

    <section class="preview-section">
      <h2 class="section-title">La nostra Community</h2>
      <p class="section-subtitle">Anteprima delle ultime Shiba-Cards inserite</p>
      <div class="preview-grid">
        <div class="preview-card" *ngFor="let preview of previews">
          <div class="preview-image">
            <img [src]="preview.image" [alt]="preview.title">
            <div class="img-overlay"><span>Vedi Dettagli</span></div>
          </div>
          <div class="preview-content">
            <span class="card-tag">Community</span>
            <h3>{{ preview.title }}</h3>
            <p>{{ preview.description }}</p>
          </div>
        </div>
      </div>
      <div class="cta-container">
        <a class="btn-modern btn-red large" [routerLink]="['/prova']">Vai a tutte le Shiba-Cards</a>
      </div>
    </section>

    <section class="stats-section">
      <div class="stats-container">
        <div class="stat-item" *ngFor="let stat of stats">
          <div class="stat-number">{{ stat.number }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { font-family: 'Inter', sans-serif; }

    /* HERO SECTION CON TUA FOTO */
    .hero-section {
      height: 90vh; display: flex; justify-content: center; align-items: center;
      text-align: center; 
      background: url('/assets/hero-background.png') center/cover no-repeat;
      position: relative; color: white;
    }
    .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); }
    .hero-content { z-index: 10; }
    
    .badge { background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; margin-bottom: 20px; display: inline-block; }
    h1 { font-size: 3.5rem; font-weight: 900; margin-bottom: 20px; }
    .text-gradient { background: linear-gradient(90deg, #ff4d4d, #ffffff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    
    .button-group { display: flex; gap: 20px; justify-content: center; margin-top: 30px; }
    .btn-modern { padding: 15px 35px; border-radius: 12px; font-weight: 700; text-decoration: none; transition: 0.3s; }
    .btn-red { background: #a72828; color: white; }
    .btn-white { background: white; color: #502c2c; }

    /* STORY SECTION */
    .shiba-description-section { padding: 80px 20px; background: #f8f9fa; }
    .shiba-description-container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 25px; box-shadow: 0 15px 40px rgba(0,0,0,0.05); position: relative; }
    .accent-line { position: absolute; top: 0; left: 0; width: 100%; height: 5px; background: #a72828; }
    .section-title { font-size: 2.2rem; font-weight: 800; text-align: center; margin-bottom: 25px; }

    /* PREVIEW GRID 3 PER FILA */
    .preview-section { padding: 80px 20px; background: white; text-align: center; }
    .preview-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; max-width: 1200px; margin: 40px auto; }
    .preview-card { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #f0f0f0; transition: 0.3s; }
    .preview-card:hover { transform: translateY(-10px); }
    .preview-image { height: 200px; overflow: hidden; }
    .preview-image img { width: 100%; height: 100%; object-fit: cover; }
    .preview-content { padding: 20px; text-align: left; }
    .card-tag { color: #a72828; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }

    /* STATS */
    .stats-section { padding: 60px 20px; background: #502c2c; color: white; }
    .stats-container { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 30px; }
    .stat-number { font-size: 3rem; font-weight: 900; color: #ff4d4d; }

    @media (max-width: 992px) { .preview-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 600px) { .preview-grid { grid-template-columns: 1fr; } }
  `],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('0.7s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  previews = [
    { image: '/assets/kuma-background.jpg', title: 'Shiba Sesamo', description: 'Il mantello più raro e affascinante della specie.' },
    { image: '/assets/red-background.jpg', title: 'Shiba Aka', description: 'Il classico rosso fulvo, il più amato al mondo.' },
    { image: '/assets/black-background.jpg', title: 'Shiba Nero', description: 'Elegante, misterioso e dal carattere fiero.' }
  ];

  stats = [
    { number: '50+', label: 'Card Create' },
    { number: '20+', label: 'Adozioni' },
    { number: '100%', label: 'AI FRIENDLY' }
  ];

  ngOnInit() {}
}