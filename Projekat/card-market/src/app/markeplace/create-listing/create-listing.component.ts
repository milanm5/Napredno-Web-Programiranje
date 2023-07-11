import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Card } from 'src/app/model/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent {

  public listingForm: FormGroup;

  constructor(private cardService: CardService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.listingForm = this.fb.group({
      "name": ["", Validators.required],
      "imageUrl": ["", Validators.required],
      "price": [1 , Validators.required],
      "onSale": [false, Validators.required],
      "quantity": [1, Validators.required]
    })
  }


  list() {
    if (this.listingForm.valid) {
      const card: Card = this.listingForm.value;
      console.log("Creating card", card);
      this.cardService.addCard(card).subscribe({
        next: () => {
          this.cardService.reloadCards();
        }
      })

      this.router.navigate(["listing"]);
      this.listingForm.reset();
    }
  }


}
