import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';

export const routes: Routes = [
    {path:'', component: ShoppingPageComponent},
    {path: '**', component: NotFoundComponent}
];
