import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from '../model/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private cardsListSubject = new BehaviorSubject<Card[]>([]);
  private cartListSubjetct = new BehaviorSubject<Card[]>([]);

  constructor(private http: HttpClient) { 
    this.reloadCards();
  }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>("api/card");
  }

  getCart(): Observable<Card[]> {
    return this.http.get<Card[]>("api/card/cart");
  }

  addCard(card: Card): Observable<any> {
    return this.http.post<Card>("api/card", card);
  }

  updateCardsList(cards: Card[]) {
    this.cardsListSubject.next(cards);
  }

  updateCartList(cardsInCart: Card[]) {
    this.cartListSubjetct.next(cardsInCart);
  }

  changeQuantity(id: number, amountChange: number) {
    return this.http.patch("api/card/" + id, {changeInQuantity: amountChange});
  }

  getCardsObservable(): Observable<Card[]> {
    return this.cardsListSubject.asObservable();
  }

  getCartObservable(): Observable<Card[]> {
    return this.cartListSubjetct.asObservable();
  }

  order() {
    return this.http.delete("api/card/cart");
  }

  removeItemFromCart(id: number) {
    return this.http.patch("api/card/cart/" + id, {});
  }

  reloadCards() {
    this.getCards().subscribe({
      next: (cards: Card[]) => {
        this.updateCardsList(cards);
      },
      complete: () => {
        console.log("Finished loading cards in service!");
      }
    });

    this.getCart().subscribe({
      next: (cardsInCart: Card[]) => {
        this.updateCartList(cardsInCart);
      },
      complete: () => {
        console.log("Finished loading cart in service!")
      }
    })
  }
}
