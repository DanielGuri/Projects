import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { ListComponent } from './components/products/list/list.component';
import { AboutComponent } from './components/about/about/about.component';
import { NotFoundComponent } from './components/layout/not-found/not-found.component';
import { DetailsComponent } from './components/products/details/details.component';
import { AddComponent } from './components/products/add/add.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent },
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'products', component: ListComponent},
    {path: 'products/add', component: AddComponent},
    {path: 'products/:id', component: DetailsComponent},
    {path: 'about', component: AboutComponent},
    {path: '**', component: NotFoundComponent}
];
