import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { DeliveryPageComponent } from './delivery-page/delivery-page.component';
import { UserPageComponent } from './user-page/user-page.component';

export const routes: Routes = [
    {path:'', component: ShoppingPageComponent},
    {path:'details/:productID', component: DetailsPageComponent},
    {path:'checkout', component: CheckoutPageComponent},
    {path:'delivery', component: DeliveryPageComponent},
    {path:'user/:userID', component: UserPageComponent},
    {path: '**', component: NotFoundComponent}
];
