import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/layout/not-found/not-found.component';
import { HomeComponent } from './components/home/home/home.component';
import { AddComponent } from './components/tasks/add/add.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'tasks/add', component: AddComponent},
    {path: '**', component: NotFoundComponent}
];