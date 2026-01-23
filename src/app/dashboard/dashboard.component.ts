import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../data.service'; 

interface Richiesta {
  nome: string;
  email: string;
  shibaColor?: string; 
  experience?: string;
  notes?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  elencoRichieste: Richiesta[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.caricaDati();
  }

  caricaDati(): void {
    this.dataService.getAdozioni().subscribe({
      next: (dati) => {
        this.elencoRichieste = dati;
        console.log('Dati ricevuti da Flask:', dati);
      },
      error: (err) => {
        console.error('Errore nel recupero dati da Flask:', err);
      }
    });
  }

  cancellaTutto(): void {
    this.elencoRichieste = [];
    alert("Funzione di cancellazione sul server non ancora implementata.");
  }
}