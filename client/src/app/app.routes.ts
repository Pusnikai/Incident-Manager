import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IncidentReportComponent } from './pages/incident-report/incident-report.component';

export const routes: Routes = [
    {path:'home', component: HomeComponent},
    {path:'incident-report', component: IncidentReportComponent},
    {path:'', redirectTo:'/home', pathMatch:'full'}
];
