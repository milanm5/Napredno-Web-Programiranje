import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public message: String | null;

  constructor(private route: ActivatedRoute) {}


  ngOnInit() {
    this.message = this.route.snapshot.paramMap.get("message");
  }
}
