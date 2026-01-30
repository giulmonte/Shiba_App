import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../data.service'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  elencoRichieste: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.caricaDati();
  }

  caricaDati(): void {
    this.dataService.getAdozioni().subscribe({
      next: (dati) => {
        this.elencoRichieste = dati.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
      },
      error: (err) => console.error('Errore Flask:', err)
    });
  }
}