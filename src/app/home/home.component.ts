import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, MatButtonModule],
  template: `
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content" [@fadeInUp]>
        <span class="hero-badge">Innovazione & Tradizione</span>
        <h1>L'Universo <span class="text-gradient">Shiba-Inu</span></h1>
        <p>Condividi le tue card, interagisci con l'IA e scopri la bellezza della razza nipponica più amata.</p>
        
        <div class="button-group">
          <a class="btn-modern btn-red" [routerLink]="['/prova']" routerLinkActive="is-active">
            🚀 Aggiungi il tuo Shiba
          </a>
          <a class="btn-modern btn-outline" [routerLink]="['/adozione']" routerLinkActive="is-active">
            🐾 Adozione Shiba
          </a>
        </div>
      </div>
    </section>

    <section class="shiba-description-section">
    <div class="minimal-divider"></div>
      <div class="container" [@fadeInUp]>
        <div class="story-grid">
          <div class="story-content">
            <span class="story-pre-title">La nostra storia</span>
            <h2 class="section-title-left">L'essenza dello Shiba</h2>
            <div class="accent-bar-left"></div>
            
            <div class="story-features">
              <div class="feature-item">
                <div class="feature-text">
                  <p>🏮 Il cane <strong> Shiba Inu </strong> è una razza giapponese dalle origini antichissime; sapevi che oggi è una tra le più popolari in Giappone?</p>
                </div>
              </div>

              <div class="feature-item">
                <div class="feature-text">
                  <p>🏹 In origine venivano allevati per cacciare selvaggina piccola nelle montagne nipponiche, ma ora sono i sovrani del comfort domestico.</p>
                </div>
              </div>

              <div class="feature-item">
                <div class="feature-text">
                  <p>🎬 Resi iconici da <em>Hachiko</em> e dal web, sono una delle sei razze native protette. "Shiba Inu" significa letteralmente <strong>"Piccolo Cane"</strong>.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="story-visual">
            <div class="image-wrapper">
              <img src="assets/baka-background.jpg" alt="Shiba Story" class="story-img">
            </div>
          </div>
        </div>
      <div class="minimal-divider"></div>
    </div>
    </section>

    <section class="preview-section">
      <h2 class="section-title">LE RAZZE</h2>
      <p class="section-subtitle">Seleziona una categoria per entrare nel vivo della community</p>
      
      <div class="preview-grid" [@staggerCards]="previews.length">
        <div class="breed-card" *ngFor="let preview of previews" 
             [routerLink]="['/shiba', preview.breed]"
             [style.backgroundImage]="'url(' + preview.image + ')'">
          <div class="card-overlay">
            <div class="breed-info">
              <h3>{{ preview.title }}</h3>
              <span>VEDI CARDS →</span>
            </div>
          </div>
        </div>
      </div>

      <div class="cta-container">
        <button class="btn-modern-hub" [routerLink]="['/prova']">
          ESPLORA TUTTE LE RAZZE <span class="arrow-icon">→</span>
        </button>
      </div>
    </section>

    <section class="ai-section-container">
      <div class="minimal-divider"></div>
      <h2 class="section-title">COSA NE PENSA... 🤖</h2>
      <p class="section-subtitle">Analisi avanzata del sentiment e dei dati di community</p>

      <div class="ai-panel-footer">
        <div class="ai-content-inner">
          <div class="ai-header-box">
             <h3>Report Globale dell'Applicazione 🐾</h3>
             <p class="ai-hint">Analisi AI basata su tutte le card e le interazioni della piattaforma.</p>
             <p class="ai-status" *ngIf="analysisMessage">{{ analysisMessage }}</p>
          </div>
          
          <div class="ai-action-box">
            <button mat-flat-button class="btn-review-highlight" (click)="getGeneralReview()" [disabled]="loadingAnalysis">
              GENERA RECENSIONE SITO
            </button>
          </div>
        </div>

        <div *ngIf="latestReview" class="review-report-box" [@fadeInUp]>
          <div class="report-header">
            <span class="report-tag">GLOBAL INSIGHTS</span>
            <span class="report-date">{{ latestReview.data_generazione }}</span>
          </div>
          <div class="report-body">
            <p class="ia-text">"{{ latestReview.recensione_ia }}"</p>
          </div>
        </div>
      </div>
    <div class="minimal-divider"></div>
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
    :host { font-family: 'Inter', -apple-system, sans-serif; --bordeaux: #502c2c; --red-shiba: #a72828; }

    /* HERO */
    .hero-section {
      height: 90vh; display: flex; justify-content: center; align-items: center;
      text-align: center; background: url('/assets/hero-background.png') center/cover no-repeat;
      position: relative; color: white;
    }
    .hero-overlay { position: absolute; inset: 0; background: radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%); }
    .hero-content { z-index: 10; max-width: 800px; padding: 0 20px; }
    h1 { font-size: 3.5rem; font-weight: 900; margin-bottom: 25px; }
    .text-gradient { background: linear-gradient(90deg, #ff4d4d, #ffffff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    
    .button-group { display: flex; gap: 15px; justify-content: center; margin-top: 30px; }
    .btn-modern { padding: 15px 35px; border-radius: 12px; font-weight: 700; text-decoration: none; transition: 0.3s; }
    .btn-red { background: var(--red-shiba); color: white; box-shadow: 0 10px 20px rgba(167, 40, 40, 0.2); }
    .btn-outline { border: 2px solid white; color: white; }

    /* STORY SECTION (MINIMAL) */
    .shiba-description-section { padding: 100px 20px 40px 20px; background: white; }
    .container { max-width: 1100px; margin: 0 auto; }
    .story-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 60px; align-items: center; }
    .story-pre-title { color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; }
    .section-title-left { font-size: 2.8rem; font-weight: 800; color: #1a1a1a; margin: 10px 0 15px 0; text-align: left; }
    .accent-bar-left { width: 50px; height: 4px; background: var(--red-shiba); margin-bottom: 35px; }
    .feature-item { margin-bottom: 25px; text-align: left; }
    .feature-text p { color: #666; line-height: 1.8; font-size: 1.05rem; margin: 0; }
    .story-visual { display: flex; justify-content: flex-end; }
    .image-wrapper { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.08); max-width: 450px; }
    .story-img { width: 100%; height: 400px; object-fit: cover; display: block; }

    /* DIVISORIO LINEA MINIMAL */
    .minimal-divider { 
      height: 1px; 
      max-width: 900px; 
      margin: 60px auto; 
      background: linear-gradient(90deg, transparent 0%, #e0e0e0 50%, transparent 100%); 
    }

    /* PREVIEW RAZZE (CON PIÙ SPAZIO) */
    .preview-section { padding: 40px 20px 100px 20px; background: white; text-align: center; }
    .section-title { font-size: 2.5rem; font-weight: 800; color: #1a1a1a; margin-bottom: 10px; text-align: center; }
    .section-subtitle { color: #888; margin-bottom: 50px; font-size: 1.1rem; text-align: center; }
    .preview-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px; max-width: 1200px; margin: 0 auto; }
    
    .breed-card {
      height: 380px; border-radius: 25px; position: relative; overflow: hidden; cursor: pointer;
      background-size: cover; background-position: center;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    .breed-card:hover { transform: translateY(-12px) scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
    .card-overlay {
      position: absolute; bottom: 0; left: 0; right: 0; height: 100%;
      background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
      display: flex; align-items: flex-end; justify-content: center; padding: 30px;
    }
    .breed-info { text-align: center; }
    .breed-info h3 { color: white; font-size: 1.8rem; font-weight: 800; margin: 0; text-transform: uppercase; }
    .breed-info span { color: rgba(255,255,255,0.9); font-size: 0.85rem; font-weight: 700; display: block; margin-top: 5px; }

    .cta-container { margin-top: 50px; display: flex; justify-content: center; }
    .btn-modern-hub { background: var(--red-shiba); color: white; border: none; padding: 18px 50px; border-radius: 50px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: 0.3s; }

    /* AI PANEL */
    .ai-section-container { padding: 80px 20px; background: #f9f9f9; text-align: center; }
    .ai-panel-footer { background: var(--bordeaux); color: white; padding: 40px; border-radius: 30px; max-width: 900px; margin: 30px auto; box-shadow: 0 15px 35px rgba(80, 44, 44, 0.3); text-align: center; }
    .ai-content-inner { display: flex; flex-direction: column; align-items: center; gap: 25px; }
    .btn-review-highlight { background: white !important; color: var(--bordeaux) !important; font-weight: 800 !important; border-radius: 50px !important; padding: 12px 35px !important; text-transform: uppercase; letter-spacing: 1px; }

    /* STATS */
    .stats-section { padding: 80px 20px; background: var(--bordeaux); color: white; }
    .stats-container { display: flex; justify-content: space-around; max-width: 1000px; margin: 0 auto; flex-wrap: wrap; gap: 30px; }
    .stat-number { font-size: 3.5rem; font-weight: 900; color: #ff4d4d; }

    @media (max-width: 992px) {
      .story-grid { grid-template-columns: 1fr; gap: 40px; }
      .story-visual { order: -1; justify-content: center; }
    }
  `],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('0.7s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerCards', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(120, [
            animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  private dataService = inject(DataService);
  loadingAnalysis = false;
  analysisMessage = '';
  latestReview: any = null;

  previews = [
    { image: 'assets/red-background.jpg', title: 'Rosso (Aka)', breed: 'rosso' },
    { image: 'assets/black-background.jpg', title: 'Nero (Kuro)', breed: 'nero' },
    { image: 'assets/kuma-background.jpg', title: 'Sesamo (Goma)', breed: 'sesamo' },
    { image: 'assets/white-background.jpg', title: 'Bianco (Shiro)', breed: 'bianco' }
  ];
  
  stats = [
    { number: '50+', label: 'Card Create' },
    { number: '20+', label: 'Adozioni' },
    { number: '100%', label: 'AI Friendly' }
  ];

  ngOnInit() {}
  
  getGeneralReview(): void {
    this.loadingAnalysis = true;
    this.analysisMessage = "AI: Analisi globale in corso...";
    this.dataService.getAISiteReview().subscribe({
      next: (res: any) => {
        this.latestReview = res;
        this.loadingAnalysis = false;
        this.analysisMessage = "AI: Report generato!";
      },
      error: () => {
        this.loadingAnalysis = false;
        this.analysisMessage = "Errore durante la generazione.";
      }
    });
  }
}