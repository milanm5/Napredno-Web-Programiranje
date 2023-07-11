import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../model/card';
import { CardQuantityChange } from '../../model/card-quantity-change';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() card: Card;

  @Output() changeQuantity: EventEmitter<CardQuantityChange>;


  amount: number;

  cardClasses: {[key: string]: boolean};
  cardStyles: {[key: string]: string};

  constructor() {
    this.changeQuantity = new EventEmitter<CardQuantityChange>();
  }

  ngOnInit() {

    this.amount = 0;

    this.cardClasses = {
      "on-sale": this.card.onSale
    }
    this.cardStyles = {
      "color": this.card.quantity > 0 ? "lightgreen" : "lightcoral"
    }
  }

  increaseQuantity() {
    this.amount++;
    // this.changeQuantity.emit({card: this.card, amountChange: 1});
  }


  decreaseQuantity() {
    this.amount--;
    // this.changeQuantity.emit({card: this.card, amountChange: -1});
  }

  addToCart() {
    this.changeQuantity.emit({card: this.card, amountChange: this.amount});
  }

}
