import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from './animations';
import { slideAnimation } from './animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  providers: [],
  animations: [fadeAnimation, slideAnimation]
  
})
export class AppComponent {
  name = 'Angular';

}
