import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from './animations';
import { slideAnimation } from './animations';
@Component({
  selector: 'app-root',
  template:
  `<main [@fadeAnimation]="o.isActivated ? o.activatedRoute : ''">
    <router-outlet #o="outlet">
    </router-outlet>`,
  // templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  providers: [],
  animations: [fadeAnimation, slideAnimation]
})
export class AppComponent {
  name = 'Angular';
}

