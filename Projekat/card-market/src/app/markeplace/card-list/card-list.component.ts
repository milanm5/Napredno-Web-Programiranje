import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../../model/card';
import { CardService } from '../../services/card.service';
import { CardQuantityChange } from '../../model/card-quantity-change';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {

  public cards: Observable<Card[]>;

  constructor(private cardService: CardService) {}
  
  ngOnInit() {
    this.cards = this.cardService.getCardsObservable();
  }

  onChangeQuantity(cc: CardQuantityChange) {
    this.cardService.changeQuantity(cc.card.id, cc.amountChange).subscribe({
      next: (msg) => {
        console.log(msg);
        this.cardService.reloadCards();
      },
      error: (msg) => {
        console.log(msg);
      }
    })
   }
}
