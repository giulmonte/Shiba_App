import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProvaComponent } from './prova/prova.component';
import { AdozioneWizardComponent } from './adozione/adozione-wizard.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'prova', component: ProvaComponent },
  { path: 'adozione', component: AdozioneWizardComponent },
  { path: 'dashboard', component: DashboardComponent }, 
  { path: '**', redirectTo: '' }
];