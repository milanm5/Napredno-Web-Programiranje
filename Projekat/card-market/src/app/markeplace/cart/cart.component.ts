import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Card } from 'src/app/model/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public cardsInCart: Observable<Card[]>;
  public shippingForm: FormGroup;
  public countries: String[];


  constructor(private cardService: CardService, private fb: FormBuilder) {
  }
  
  ngOnInit() {
    this.cardsInCart = this.cardService.getCartObservable();
    this.shippingForm = this.fb.group({
      "name": ["", Validators.required],
      "phoneNum": ["", Validators.required],
      "country": [Validators.required],
      "city": ["", Validators.required],
      "address": ["", Validators.required],
      "zip": ["", Validators.required]
    })

    this.countries = ["Serbia", "North Macedonia", "Montenegro", "Bosnia & Herzegovina", "Croatia", "Slovenia"];
  }

  remove(id: number) {
    this.cardService.removeItemFromCart(id).subscribe({
      next: (msg) => {
        console.log(msg);
        this.cardService.reloadCards();
      },
      error: (msg) => {
        console.log(msg);
      }
    })
  }

  order() {
    this.cardService.order().subscribe({
      next: (msg) => {
        console.log(msg);
        this.cardService.reloadCards();
      },
      error: (msg) => {
        console.log(msg);
      }
    });

  }
}
