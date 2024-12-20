import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';

export const routes: Routes = [
    {path:'', component: ShoppingPageComponent},
    {path:'details', component: DetailsPageComponent},
    {path: '**', component: NotFoundComponent}
];
