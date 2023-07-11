import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './markeplace/card-list/card-list.component';
import { LoginComponent } from './user/login/login.component';
import { CartComponent } from './markeplace/cart/cart.component';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';
import { CreateListingComponent } from './markeplace/create-listing/create-listing.component';

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "home", component: HomeComponent},
  {path: "home/:message", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "listing", component: CardListComponent},
  {path: "create-listing", component: CreateListingComponent, canActivate: [authGuard]},
  {path: "cart", component: CartComponent},
  {path: "**", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
