import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardService } from './services/card.service';
import { CardListComponent } from './markeplace/card-list/card-list.component';
import { CardComponent } from './markeplace/card/card.component';
import { LoginComponent } from './user/login/login.component';
import { CartComponent } from './markeplace/cart/cart.component';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './services/user.service';
import { UserStoreService } from './services/user-store.service';
import { CreateListingComponent } from './markeplace/create-listing/create-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    CardListComponent,
    CardComponent,
    LoginComponent,
    CartComponent,
    RegisterComponent,
    HomeComponent,
    CreateListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [CardService, UserService, UserStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
